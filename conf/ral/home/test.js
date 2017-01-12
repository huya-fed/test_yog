/*
* @Author: xiejinlong
* @Date:   2017-01-03 16:39:45
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-01-11 16:14:59
*/

module.exports = {
	'LiveList': {
		protocol: 'http',              // 使用http协议请求
		pack: 'querystring',           // 数据封装为query
		unpack: 'json',                // 约定服务端返回JSON数据
		encoding: 'utf-8',             // 服务器返回utf-8编码
		balance: 'roundrobin',         // 负载均衡策略
	    timeout: 1000,                  // 请求最长超时时间500ms
	    retry: 3,                      // 请求重试次数
		method: 'GET',                 // 使用GET请求
	    path: '/cache.php',      // API路径
	    query: {                       // 服务的全局query
	        'm':'LiveList',
			'do':'getLiveListByPage',
			'tagAll':0,
			'page':1
	    },
	    // 后端地址配置
	    server: [                      // 可以配置多个后端地址
	        {
	            host: 'www.huya.com',
	            port: 80
	        }
	    ]
	}
};