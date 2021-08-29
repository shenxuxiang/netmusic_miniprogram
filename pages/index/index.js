Page({
  data: {
    navList: [
      { id: 'recommend', title: '个性推荐' },
      { id: 'playlist', title: '歌单' },
      { id: 'radio', title: '主播电台' },
      { id: 'ranking', title: '排行版' },
    ],
    activeNavKey: 'recommend',
  },
  onReady() {
    wx.login({
      success: (res) => {
        console.log(res);
        wx.showToast({ icon: 'none', title: '登陆成功' });
      }
    })
  },
  handleChangeTab(event) {
    const activeNavKey = event.detail.key;
    this.setData({ activeNavKey });
  },
  onShareAppMessage() {
    return {
      title: '旭祥音乐',
      page: '/pages/index/index',
    };
  },
  onShareTimeline() {
    return {
      title: "旭祥音乐",
      page: '/pages/index/index',
    };
  }
});

