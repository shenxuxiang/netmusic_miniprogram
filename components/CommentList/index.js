const { queryCommentList } = require('../../service/api');
const formatCommentTime = require('../../utils/format-comment-time');

Component({
  options: {
    virtualHost: true,
    pureDataPattern: /^_/,
    styleIsolation: 'isolated',
  },
  properties: {
    commentID: {
      type: String,
      value: '',
    },
  },
  data: {
    hotCommentList: [],
    commentList: [],
    offset: 0,
    limit: 20,
    loadStatus: 'done',
  },
  methods: {
    // 加载数据
    handleQuerySource(id) {
      const { offset, limit } = this.data;
      this.setData({ loadStatus: 'loading' });
  
      queryCommentList({ id, offset, limit })
        .then(response => {
          const { hotComments, comments, more, code, msg } = response;
          if (code === 200) {
            const data ={ commentList: this.data.commentList.concat(this.computedArrayTime(comments)) };
            data.offset = data.commentList.length;
            data.loadStatus = more ? 'done' : 'notMore';
            if (hotComments) data.hotCommentList = this.computedArrayTime(hotComments);
            this.setData(data);
          } else {
            wx.showToast({ icon: 'none', title: msg })
          }
        })
        .finally(() => {
          this.setData({ loadStatus: 'done' });
        });
    },
    computedArrayTime(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].time = formatCommentTime(arr[i].time);
      }
      return arr;
    },
    handleReachBottom() {
      if (this.data.loadStatus !== 'done') return;
      this.handleQuerySource(this.data.commentID);
    }
  },
  observers: {
    commentID(value) {console.log()
      if (value === this.commentID) return;
      this.commentID = value;
      // 每当 id 发生变化时，先清空数据。
      this.setData({ offset: 0, hotCommentList: [], commentList: [] });
      value && this.handleQuerySource(value);
    }
  }
});