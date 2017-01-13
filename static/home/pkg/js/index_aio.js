define('home:client/modules/test', function(require, exports, module) {

  /*
  * @Author: xiejinlong
  * @Date:   2017-01-05 15:22:35
  * @Last Modified by:   xiejinlong
  * @Last Modified time: 2017-01-05 15:22:49
  */
  
  console.log('test.js')

});

define('home:client/modules/index', function(require, exports, module) {

  require('home:client/modules/test');
  console.log('index.js')

});

