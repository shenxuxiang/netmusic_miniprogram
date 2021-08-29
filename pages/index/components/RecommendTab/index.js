const { queryPersonalized, queryNewSongList, queryMVList, queryDJList } = require('../../../../service/api');

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
    loading: false,
    recommendList: [],
    newSongList: [],
    mvList: [],
    djList: [],
    isFirstRender: true,
  },
  lifetimes: {},
  methods: {
    onPageInit() {
      queryPersonalized()
        .then(response => {
          const { code, result } = response;
          if (code === 200) {
            this.setData({ recommendList: result.slice(0, 6) });
          }
        });
      queryNewSongList()
        .then(response => {
          const { code, result } = response;
          if (code === 200) {
            this.setData({ newSongList: result.slice(0, 6) });
          }
        });
      queryMVList()
        .then(response => {
          const { code, result } = response;
          if (code === 200) {
            this.setData({ mvList: result.slice(0, 6) });
          }
        });
      queryDJList()
        .then(response => {
          const { code, result } = response;
          if (code === 200) {
            this.setData({ djList: result.slice(0, 6) });
          }
        });
    },
  },
  observers: {
    visible(value) {
      if (value && this.data.isFirstRender) {
        this.setData({ isFirstRender: false });
        this.onPageInit();
      }
    }
  },
});