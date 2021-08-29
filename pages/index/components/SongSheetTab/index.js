const { queryPlayListByCategory } = require('../../../../service/api');

Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
    pureDataPattern: /^_/,
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    isLoading: false,
    playList: [],
    loadStatus: 'done',
    _offset: 0,
    _limit: 30,
    categoryName: '全部歌单',
    offsetTop: 0,
  },
  lifetimes: {},
  pageLifetimes: {
    show() {
      const cat = wx.getStorageSync('net-music-category') || '全部歌单';
      if (cat === this.data.categoryName) return;
      this.handleChangeCategory(cat);
    },
  },
  methods: {
    getSourceList() {
      const { _offset, _limit, playList, categoryName } = this.data;
      const params = {
        limit: _limit,
        offset: _offset,
        type: categoryName,
      };
      return queryPlayListByCategory(params)
        .then(response => {
          const { playlists, code, more } = response;
          if (code === 200) {
            const newPlayList = playList.concat(playlists);
            this.setData({
              playList: newPlayList,
              loadStatus: more ? 'done' : 'norMore', 
              _offset: newPlayList.length,
            });
          }
        });
    },
    handleScrollToLower() {
      const { loadStatus } = this.data;
      if (loadStatus !== 'done') return;

      this.setData({ loadStatus: 'loading' });
      this.getSourceList();
    },
    handleNavigateToCategory() {
      wx.navigateTo({ url: '/pages/select-category/index' });
    },
    handleChangeCategory(value) {
      this.setData({ 
        hasShowSelectCategoryModal: false, 
        categoryName: value,
        playList: [],
        loadStatus: 'done',
        _offset: 0,
      }, this.getSourceList);
    },
    handleBackTop() {
      this.setData({ offsetTop: 0 });
    },
    handleGoToPlayList(event) {
      const { id } = event.currentTarget.dataset;
      wx.navigateTo({ url: `/pages/play-list/index?playlistId=${id}` })
    }
  },
  observers: {
    visible(value) {
      if (value && this.data.playList.length === 0) {
        this.setData({ isLoading: true });
        this.getSourceList()
          .then(() => {
            this.setData({ isLoading: false });
          });
      }
    },
  },
});