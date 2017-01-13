/*var index = require('../model/index.js');
var util = require('../lib/util.js');*/




module.exports = function(req, res){
	var xx = yog.ralP('LiveList');
	xx.then(function(data){
		res.render('home/views/index.tmpl', {
			list : data.data.datas
		});
	})
};