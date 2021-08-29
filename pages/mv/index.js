const { queryMvDetail, querySimilarMV } = require('../../service/api');

Component({
  options: {},
  properties: {
    id: {
      type: String,
      value: ''
    }
  },
  data: {
    mvDetail: null,
    mvs: [],
    activeTab: 'detail',
  },
  methods: {
    onLoad(query) {
      const { id } = query;
      if (!id) {
        wx.showToast({ title: '参数非法', icon: "error" });
        return;
      }
      queryMvDetail({ id })
        .then(response => {
          const { code, data } = response;
          if (code === 200) {
            this.setData({ mvDetail: data });
          }
        });

      querySimilarMV({ id })
        .then(response => {
          const { code, mvs } = response;
          if (code === 200) {
            this.setData({ mvs });
          }
        });
    },
    handleClickTab(event) {
      const { tabName } = event.currentTarget.dataset;
      this.setData({ activeTab: tabName });
    }
  }
});