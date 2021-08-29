const { queryRankingList } = require('../../../../service/api');

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
    isFirstRender: true,
    rankingList: [],
    artistToplist: null,
    rewardToplist: null,
  },
  methods: {
    onPageInit() {
      queryRankingList()
        .then(response => {
          const { code, artistToplist, rewardToplist, list } = response;
          if (code === 200) {
            this.setData({ artistToplist, rewardToplist, rankingList: list });
          }
        })
    },
  },
  observers: {
    visible(value) {
      if (value && this.data.isFirstRender) {
        this.setData({ isFirstRender: false });
        this.onPageInit();
      }
    }
  }
});