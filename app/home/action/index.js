/*var index = require('../model/index.js');
var util = require('../lib/util.js');*/




module.exports = function(req, res){
	var LiveList = yog.ralP('home_http',{
        query: {                       
	        'm':'LiveList',
			'do':'getLiveListByPage',
			'tagAll':0,
			'page':1
	    }
	});

	var SidebarNav = yog.ralP('home_http',{
        query: {                       
	        'm':'SidebarNav',
			'do':'getItems'
	    }
	});


	


	Promise.all([LiveList,SidebarNav]).then(function(posts){
		res.render('home/views/index.tmpl', {
			list : posts[0].data,
			leftNav : posts[1]
		});	
	}).catch(function(){
		//todo
	})
};