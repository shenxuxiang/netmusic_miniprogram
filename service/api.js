const request = require('../utils/request');
const BASE_URL = 'http://192.168.1.3:3000/v1';
// const BASE_URL = 'http://localhost:3000/v1';

// 获取推荐歌单
function queryPersonalized(query) {
  return request(`${BASE_URL}/personalized`, 'GET', query);
}
// 获取最新音乐
function queryNewSongList(query) {
  return request(`${BASE_URL}/personalized/newsong`, 'GET', query);
}
// 获取推荐mv
function queryMVList(query) {
  return request(`${BASE_URL}/personalized/mv`, 'GET', query);
}
// 获取推荐DJ
function queryDJList(query) {
  return request(`${BASE_URL}/personalized/djprogram`, 'GET', query);
}
// 获取所有的 category
function queryCategoryList() {
  return request(`${BASE_URL}/playlist/catlist`, 'GET', {});
}
// 获取歌曲列表
function queryPlayListByCategory(query) {
  return request(`${BASE_URL}/top/playlist`, 'GET', query);
}
// 获取精彩节目推荐
function queryRecommendProgram() {
  return request(`${BASE_URL}/program/recommend`, 'GET', {});
}
// 获取精选电台
function queryRecommendDjRadio() {
  return request(`${BASE_URL}/djradio/recommend`, 'GET', {});
}
// 获取精选hot电台
function queryRecommendHotRadio() {
  return request(`${BASE_URL}/djradio/hot`, 'GET', {});
}
// 获取排行版数据
function queryRankingList() {
  return request(`${BASE_URL}/toplist/detail`, 'GET', {});
}

/**
 * 以下是播放音乐页面的借口
 * */
// 获取排行版数据
function querySongDetail(query) {
  return request(`${BASE_URL}/music/detail`, 'GET', query);
}
// 获取指定音频的URL
function queryMusicUrl(query) {
  return request(`${BASE_URL}/music/url`, 'GET', query);
}
// 获取歌曲对应的歌词
function queryMusicLyric(query) {
  return request(`${BASE_URL}/lyric`, 'GET', query);
}
// 获取歌单详细信息
function queryPlaylistDetail(query) {
  return request(`${BASE_URL}/playlist/detail`, 'GET', query);
}

// 获取评论的数据
function queryCommentList(query) {
  return request(`${BASE_URL}/comments`, 'GET', query);
}

// 获取mv详情
function queryMvDetail(query) {
  return request(`${BASE_URL}/mv`, 'GET', query);
}

// 获取相关的MV
function querySimilarMV(query) {
  return request(`${BASE_URL}/mv/simi`, 'GET', query);
}


module.exports = {
  queryPersonalized,
  queryNewSongList,
  queryMVList,
  queryDJList,
  queryCategoryList,
  queryPlayListByCategory,
  queryRecommendProgram,
  queryRecommendDjRadio,
  queryRecommendHotRadio,
  queryRankingList,
  querySongDetail,
  queryMusicUrl,
  queryMusicLyric,
  queryPlaylistDetail,
  queryCommentList,
  queryMvDetail,
  querySimilarMV,
}