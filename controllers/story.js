/**
 * Created by bw964 on 2016-08-06.
 */
var request = require("request");
var mongoose = require("mongoose");

var Story = require("../models/story");
var StoryContent = require("../models/storyContent");

var db = "mongodb://localhost/newsfeed1";

mongoose.connect(db);

// parse story from lineup
function parseLineupStory(rawStory) {
    var parsedStory = new Story()

    parsedStory.id = rawStory.id
    parsedStory.title = rawStory.title
    parsedStory.status = rawStory.status
    parsedStory.date = rawStory.lastupdate
    parsedStory.summary = rawStory.description
    if(rawStory.epoch) {
        parsedStory.timestamp = parseInt(rawStory.epoch.lastupdate)
    }
    if(rawStory.headlineimage && rawStory.headlineimage.derivatives) {
        if(rawStory.headlineimage.derivatives["16x9_460"]) {
            parsedStory.imageUrl = rawStory.headlineimage.derivatives["16x9_460"].fileurl
        } else if(rawStory.headlineimage.derivatives["16x9_300"]) {
            parsedStory.imageUrl = rawStory.headlineimage.derivatives["16x9_300"].fileurl
        } else {
            parsedStory.imageUrl = undefined
        }
    }
    parsedStory.categories = []
    if(rawStory.departments) {
        for(i in rawStory.departments) {
            parsedStory.categories.push(rawStory.departments[i].label)
        }
    }
    return parsedStory
}

// parse story content
function parseStoryContent(content) {
    var parsedContent = new StoryContent();

    parsedContent.id = content.id;
    parsedContent.headline = content.headline;
    parsedContent.summary = content.summary;
    parsedContent.body = content.body;

    if(content.leadmedia && content.leadmedia.derivatives) {
        if(content.leadmedia.derivatives["16x9_620"]) {
            parsedContent.headlineImage = content.headlineimage.derivatives["16x9_620"].fileurl;
        } else if(content.headlineimage.derivatives["16x9_460"]) {
            parsedContent.headlineImage = content.headlineimage.derivatives["16x9_460"].fileurl;
        } else {
            parsedContent.headlineImage = undefined;
        }
    }

    return parsedContent;
}

// populate db with story content
function downloadStoryContent(storyId) {
    StoryContent.findOne({"id": storyId}).exec(function(err, story) {
        if(!err && (!story || story == null)) {
            console.log("Downloading story content for " + storyId);
            request("http://www.cbc.ca/json/cmlink/" + storyId, function (err, res, body) {
                if(!err) {
                    var storyContent = parseStoryContent(JSON.parse(body));
                    StoryContent.create(storyContent, function(err, res) {
                        if(err) {
                            console.log("Error saving content for story " + storyId);
                        } else {
                            console.log("Saved content for story " + storyId)
                        }
                    });
                }
            })
        } else {
            //console.log("Story " + storyId + " already saved");
        }
    })
}

// populate db with stories from lineup
function refresh(req, res) {
    console.log("Refreshing stories");
    request("http://www.cbc.ca/json/cmlink/7.4195", function(err, res2, body) {
        if(err) {
            if(res != null) {
                res.send("could not connect to server")
            }
        } else {
            var unparsedStories = JSON.parse(body).contentlist.contentitems
            console.log("Retrieving stories: " + unparsedStories.length + " retrieved")

            var parsedStoryArray = []
            for(i in unparsedStories) {
                if(unparsedStories[i].type != "story") {
                    continue
                }
                parsedStoryArray.push(parseLineupStory(unparsedStories[i]))
            }

            for(i in parsedStoryArray) {
                (function(parsedStory) {
                    Story.findOne({"id" : parsedStory.id}).exec(function(err, story) {
                        if(!err && (!story || story == null)) {
                            Story.create(parsedStory, function(err, story) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log("story " + parsedStory.id + " saved");
                                    downloadStoryContent(parsedStory.id);
                                }
                            })
                        } else {
                            console.log("story " + parsedStory.id + " not saved");
                        }
                    })
                })(parsedStoryArray[i]);
            }
            if(res && res != null) {
                res.send("Refreshed");
            }
        }
    })
}

function getLineup(req, res) {
    Story.find({}, { "_id": 0, "id": 1, "title": 1, "date": 1, "timestamp": 1,
        "categories": 1, "status": 1, "imageUrl": 1, "summary": 1})
        .sort({timestamp: -1})
        .limit(30)
        .exec(function(err, stories) {
            if(err) {
                res.send("Error retrieving stories")
            } else {
                res.send(stories)
            }
        })
}

function getStory(req, res) {
    var storyId = req.params.id;

    StoryContent.findOne({"id": storyId}, {"_id": 0, "id": 1, "headline": 1, "summary": 1, "body": 1, "headlineImage": 1})
        .exec(function(err, story) {
            if(err || !story) {
                res.send("No story found");
            } else {
                res.send(story);
            }
        })
}

function getAllContent(req, res) {
    StoryContent.find({}, {"_id": 0, "id": 1, "headline": 1, "summary": 1, "body": 1, "headlineImage": 1})
        .exec(function(err, stories) {
            if(err || !stories) {
                res.send("No stories found");
            } else {
                res.send(stories);
            }
        })
}

exports.getLineup = getLineup;

exports.refresh = refresh;

exports.getStory = getStory;

exports.getAllContent = getAllContent;