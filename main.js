var binderClip = require('binderClip.js');

var c = {
	baseURL : "/o/",
	title : "binderClip",
	articlesPerPage : 3,
	trimLength : -1,
	themeDir : "default"
}

binderClip.init(c).generate();