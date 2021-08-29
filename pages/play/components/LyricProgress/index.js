Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated',
    pureDataPattern: /^_/,
  },
  properties: {
    lyricList: {
      type: Array,
      value: [],
    },
    currentTime: {
      type: Number,
      value: 0,
    },
    duration: {
      type: Number,
      value: 0,
    },
    playStatus: {
      type: String,
      value: 'paused',
    }
  },
  data: {
    lyric: '',
    active: false,
    style: {},
  },
  observers: {
    playStatus(value) {
      const { style } = this.data;
      if (value === style['animation-play-state']) return;
      this.setData({ style: { ...style, 'animation-play-state': value } });
    },
    currentTime(value) {
      const { lyricList, duration, playStatus } = this.data;
      const length = lyricList.length;
      let lyric = '';
      let lyricIndex = 0;

      for (let i = 0; i < length; i++) {
        const { time, context } = lyricList[i];
        // 当音频的当前播放时间是否大于等于歌词开始时间
        // 注意这里 curretTime 加了 1，意思是提前一秒切换到下一句歌词。
        // 这样用户的视觉效果会好一些
        if (value + 1 >= time) {
          lyric = context;
          lyricIndex = i;
        } else {
          break;
        }
      }
      if (lyric === this.data.lyric) return;
      // 计算动画的 animation-duration
      let animationTime = lyricIndex + 1 >= length ?
        duration - lyricList[lyricIndex].time :
        lyricList[lyricIndex + 1].time - lyricList[lyricIndex].time;

      // delay 表示举例当前歌词开始时间已经过去了多长时间
      // 然后将 animation-delay 设置为 负的delay。就可以播放时达到我们的效果。
      let delay = value - lyricList[lyricIndex].time;
      // 将动画的播放时间缩短 2 秒。
      // 这样就不至于歌词进度还没有播放结束就切换到下一句歌词了，
      // 原因是我们提前了一秒切换了歌词，为了让用户看到歌词播放完毕，所以将动画整体时间缩短2秒
      animationTime = animationTime - 2;

      if (animationTime <= 0) animationTime = 0;
      // 延迟时间不能大于动画播放的时间
      if (delay >= animationTime) delay = animationTime;

      const style = {
        'animation-duration': `${animationTime.toFixed(2)}s`,
        'animation-delay': `${delay < 1 ? 0 : -delay.toFixed(2)}s`,
        'animation-play-state': playStatus,
      };
      // 将 active 设置为 false。来关闭动画。500ms 后在开启动画。
      this.setData({ lyric, style, active: false });

      setTimeout(() => {
        this.setData({ active: true });
      }, 500);
    }
  }
});