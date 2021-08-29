const { querySongDetail, queryMusicUrl, queryMusicLyric } = require('../../service/api');
const audioInstance = require('../../utils/player-manager');

function computedMusicLyric(lyric) {
  const ary = lyric.split('\n');
  const stack = [];
  for (let i = 0; i < ary.length; i++) {
    const str = ary[i];
    if (!str) continue;
    const [ first, second ] = str.split(']');
    const secArr = first.slice(1, 8).split(':');
    const time = 60 * secArr[0] + 1 * secArr[1];
    const context = second.replace(/^\s+/, '').replace(/\s+$/, '');
    stack.push({ time, context });
  }
  return stack;
}

Page({
  data: {
    sourceUrl: '',
    coverImg: '',
    // 封面图片
    // 是否正在播放
    isPlaying: false,
    // 是否可以播放
    isCanplay: false,
    // 当前播放进度
    currentTime: 0,
    // 音频的总时长
    duration: 0,
    // 歌词
    lyrics: [],
    nextSong: { id: 1866231220 },
    prevSong: { id: 1868206873},
  },
  listenCanplay() {
    this.setData({ isCanplay: true });
  },
  listenTimeUpdate(currentTime, duration) {
    this.setData({ currentTime, duration });
  },
  listenPlay() {
    this.setData({ isPlaying: true });
  },
  listenPause() {
    this.setData({ isPlaying: false });
  },
  listenEnd() {
    // 这里需要调用 stop 方法，否则 timeUpdate 不在触发。这应该是小程序的问题
    this.setData({ isPlaying: false, currentTime: 0 });
  },
  listenStop() {
    his.setData({ isPlaying: false, currentTime: 0 });
  },
  onLoad(query) {
    // 监听音频是否可以开始播放
    audioInstance.on('canplay', this.listenCanplay);
    // 监听音频播放进度
    audioInstance.on('time_update', this.listenTimeUpdate);
    // 监听音频播放
    audioInstance.on('play', this.listenPlay);
    // 监听音频暂停
    audioInstance.on('pause', this.listenPause);
    audioInstance.on('end', this.listenEnd);
    audioInstance.on('stop', this.listenStop);

    if (query.songId) {
      this.queryMusicDetail(query.songId);
    } else {
      wx.showToast({ title: '参数非法', icon: 'error' });
    }
  },
  onUnload() {
    audioInstance.ctx.stop();
    audioInstance.remove('canplay', this.listenCanplay);
    audioInstance.remove('time_update', this.listenTimeUpdate);
    audioInstance.remove('play', this.listenPlay);
    audioInstance.remove('pause', this.listenPause);
    audioInstance.remove('end', this.listenEnd);
    audioInstance.remove('stop', this.listenStop);
  },
  // 获取音频信息
  queryMusicDetail(songId) {
    // 获取音乐的详细信息
    querySongDetail({ id: songId })
      .then(response => {
        const { code, songs } = response;
        if (code === 200) {
          if (songs && songs[0]) {
            const { l, name } = songs[0];
            wx.setNavigationBarTitle({ title: name });
            const br = l.br;
            const coverImg = songs[0].al.picUrl;
            // 获取音频的 URl
            queryMusicUrl({ id: songId, br })
              .then(res => {
                if (res && res.code === 200) {
                  const url = res.data[0].url;
                  this.setData({ sourceUrl: url, coverImg });
                  audioInstance.init(url);
                }
              })
          }
        }
      });
    // 获取音频歌词
    queryMusicLyric({ id: songId  })
      .then(response => {
        const { code, lrc } = response;
        if (code === 200) {
          const lyrics = computedMusicLyric(lrc.lyric);
          this.setData({ lyrics });
        }
      });
  },
  // 点击播放
  handlePlay() {
    if (!this.data.isCanplay) {
      wx.showToast({ title: '正在加载音频资源，请稍后再试～', icon: 'none' });
      return;
    }
    audioInstance.play();
  },
  // 点击暂停
  handlePause() {
    audioInstance.pause();
  },
  handleSeek(event) {
    const duration = audioInstance.ctx.duration;
    if (!this.data.isCanplay || !duration) {
      wx.showToast({ title: '正在加载音频资源，请稍后再试～', icon: 'none' });
      return;
    }
    const { value } = event.detail;
    const count = Number((duration * value / 100 || 0).toFixed(0));
    audioInstance.seek(count);
    this.setData({ currentTime: count });
  },
  handleNext() {
    const { nextSong } = this.data;
    if (nextSong.id) {
      this.queryMusicDetail(nextSong.id);
    }
  },
  handlePrev() {
    const { prevSong } = this.data;
    if (prevSong.id) {
      this.queryMusicDetail(prevSong.id);
    }
  },

});
