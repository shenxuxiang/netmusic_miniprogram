Page({
  data: {
    id: '',
  },
  onLoad(query) {
    // 加载页面数据
    if (!query.id) {
      wx.showToast({ title: '参数非法', icon: 'error' });
      wx.navigateBack();
    } else {
      this.setData({ id: query.id });
    }
  },
});