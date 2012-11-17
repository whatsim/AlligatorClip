//
//	Abstract
//

/*
	
	So goal is to have a filesystem based static site generator.

	To that end I need to:

		1) parse directory structure into site representation.
		2) step through that and gen everything.

	Without a blog, this is relatively easy, so, we'll start there I think.

*/

var fs = require('fs');
var md = require('node-markdown').Markdown;
var jade = require('jade');
var sugar = require('sugar');

var rootPath = require('path').dirname(require.main.filename);

var articles = fs.readdirSync(rootPath + "/articles");
var pages = fs.readdirSync(rootPath + "/pages");

//	note to self, need to warn of parse errors
//	this will live here for now, but later I think it'd be good to spin this out into a json file.

var configuration = {
	homepage : "index.jade"
	title : "binderclip"
	articlesPerPage : 3,
	trimLength : -1
}

var articlesLength = articles.length;

for(var i = 0; i < articlesLength; i++){
	articles[i]
}