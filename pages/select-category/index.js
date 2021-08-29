const { queryCategoryList } = require('../../service/api');

Component({
  options: {
    stleIsolation: 'shared',
    pureDataPattern: /^_/,
  },
  data: {
    catList: [],
    subCatMap: {},
    current: '全部歌单',
  },
  methods: {
    onLoad() {
      let cat = '';
      try {
        cat = wx.getStorageSync('net-music-category') || '全部歌单';
      } catch (error) {
        console.log(error);
      }

      queryCategoryList()
        .then(response => {
          const { categories, sub, code } = response;
          if (code === 200) {
            const catList = [];
            const keys = Object.keys(categories);
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              catList.push({ key, title: categories[key] });
            }
            const subCatMap = {};
            for (let i = 0; i < sub.length; i++) {
              const key = sub[i].category;
              if (!subCatMap[key]) subCatMap[key] = [];
              subCatMap[key].push(sub[i]);
            }
            this.setData({ catList, subCatMap, current: cat });
          }
        });
    },
    handleClick(event) {
      const { category } = event.currentTarget.dataset;
      this.setData({ current: category });
    },
    handleSave() {
      wx.setStorage({ key: 'net-music-category', data: this.data.current });
      wx.showToast({
        title: '修改成功',
        icon: 'none',
        success: () => wx.navigateBack(),
      });
    },
  },
});