var binderClip = require('binderClip.js');

var c = {
	baseURL : "/o/",
	title : "binderClip",
	articlesPerPage : 3,
	trimLength : -1,
	themeDir : "default",
	contentTypes : ['pages','sidebars', 'articles'],
}

//binderClip.init(c).generate();
console.log(binderClip.init(c).getContentTree());