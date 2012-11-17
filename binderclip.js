//
//	Abstract
//

/*
	
	So goal is to have a filesystem based static site generator.

	To that end I need to:

		1) parse directory structure into site representation. //kind of check
			-need better per page/article configuration
		2) step through that and gen everything.

	Without a blog, this is relatively easy, so, we'll start there I think.

*/

var c = {
	baseurl : "/",
	title : "binderClip",
	articlesPerPage : 3,
	trimLength : -1,
	themeDir : "default"
}

var fs = require('fs');
var md = require('node-markdown').Markdown;
var jade = require('jade');
var util = require('util');

//	note to self, need to warn of parse errors
//	this will live here for now, but later I think it'd be good to spin this out into a json file.

var binderClip = (function(){
	
	var rootPath = require('path').dirname(require.main.filename);
	
	var configuration;

	function loadContent(){
		var articles = fs.readdirSync(rootPath + "/articles");
		var pages = fs.readdirSync(rootPath + "/pages");
		var articlesLength = articles.length;
		var pagesLength = pages.length;

		var obj = {
			articles : new Array(),
			pages : new Array()
		};

		for(var i = 0; i < articlesLength; i++){
			var a = contentObjectFromFile(articles[i],'articles')
			if(a) obj.articles.push(a);
		}

		for(var i = 0; i < pagesLength; i++){
			var p = contentObjectFromFile(pages[i],'pages')
			if(p) obj.pages.push(p);
		}
		return obj
	}

	function contentObjectFromFile(name,section){
		if(name != '.DS_Store'){
			var file = fs.readFileSync(rootPath+"/"+section+"/"+name).toString();
			var time = fs.statSync(rootPath+"/"+section+"/"+name).ctime;

			var sections = file.split(':body')
			//added inline json object, could be used for tags and stuff, that sort of thing.
			var info = JSON.parse(sections[0]);
			var title = info.title;
			var body = sections[1];
			
			var obj = {
				name:name.replace('.md',''),
				title:title,
				body: md(body.trim()),
				date: time
			}
			return obj
		}
	}

	function createNavList(obj){
		var nl = new Array();
		var pagesLength = obj.pages.length;
		for(var i = 0; i < pagesLength; i++){
			var n = obj.pages[i].name;
			var l = n.replace(' ','_');
			var navItem = {
				name:n,
				link:l
			}
			nl.push(navItem);
		}
		return nl
	}

	function render(contentTree,navList){
		var path = rootPath + "/themes/" + configuration.themeDir + "/views/index.jade";
		jade.renderFile(path, {config:configuration,p:contentTree.pages[0],nav:navList,pretty:true},function(err,html){
			if(err){
				console.error('\nTheres something wrong with the template located at:');
				console.error(path);
				console.error('\n'+err + '\n');
			} else {
				var oBuf = new Buffer(html);
				var oPath = rootPath + "/o/" + contentTree.pages[0].name + ".html";
				fs.open(oPath, 'w',function(err,file){
					if(err){
						console.error("\nCouldn't open file for output:");
						console.error(oPath);
						console.error('\n' + err + '\n');
					} else {
						fs.write(file, oBuf, 0, oBuf.length, 0,function(err){
							if(err){
								console.error("\nCouldn't write to file:");
								console.error(oPath);
								console.error('\n' + err + '\n');
							}
						});
					}
				});
			}
		})
	}
	return {
		init : function(c){
			configuration = c;
			//does this create a copy, or does it just return a pointer to the same object
			//its kind of nice to be able to chain em.
			return this
		},
		generate : function(){
			var contentTree = loadContent();
			var navList = createNavList(contentTree);
			render(contentTree,navList);
		}
	}
})()

binderClip.init(c).generate();