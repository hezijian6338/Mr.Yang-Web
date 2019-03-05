/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * dataSources：数据源
 */

let baseUrl = '';
let photoUrl = '';
let routerMode = 'hash';
let dataSources = 'service'; //local=本地，其他值代表非本地


if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://localhost:8081';
  photoUrl = 'http://hezijian6338.ddns.net:8833'
  // photoUrl = 'http://localhost:8833'
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = '';
}

export {
  baseUrl,
  photoUrl,
  routerMode,
  dataSources,
}