/**
 * Created by bw964 on 2016-08-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoryContentSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    headline: String,
    summary: String,
    body: String,
    headlineImage: String
});

module.exports = mongoose.model('StoryContent', StoryContentSchema);