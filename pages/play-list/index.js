const { queryPlaylistDetail } = require('../../service/api');

Page({
  options: {
    pureDataPattern: /^_/,
  },
  data: {
    // 歌单详情
    playlistDetail: {},
    // 歌曲列表
    playlist: {},
    // 歌单创建者
    creator: '',
    tracks: [],
  },
  onLoad(query) {
    const { playlistId } = query;
    if (!playlistId) {
      wx.showToast({ title: '参数非法', icon: 'error' });
      return;
    }
    queryPlaylistDetail({ id: playlistId })
      .then(response => {
        const { code, playlist, msg } = response;
        if (code === 200) {
          const { creator, tracks } = playlist;
          this.setData({ playlist, creator, tracks });
        } else {
          wx.showToast({ icon: 'none', title: msg })
        }
      });
  },
  handlePlaySong(event) {
    const { songId } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/play/index?songId=${songId}` });
  },
  handlePlayMv(event) {
    const { mvId } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/mv/index?id=${mvId}` })
  },
  handleClickCommentIcon(event) {
    const { commentId } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/comment/index?id=${commentId}` });
  }
});