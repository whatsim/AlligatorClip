var alligatorClip = require('alligatorClip.js');

var c = {
	baseURL : "/o/",
	title : "alligatorClip",
	articlesPerPage : 3,
	trimLength : -1,
	themeDir : "default",
	contentTypes : ['pages','sidebars', 'articles'],
}

alligatorClip.init(c).watchMode();
//console.log(alligatorClip.init(c).getContentTree());