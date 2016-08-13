var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	title: String,
	categories: [],
	summary: String,
	status: String,
	date: String,
	timestamp: Number,
	imageUrl: String
});

module.exports = mongoose.model('Story', StorySchema);