const eventName = new Set(['canplay', 'time_update', 'play', 'pause', 'seeked', 'end', 'stop']);

function AudioManager() {
  this.ctx = wx.createInnerAudioContext();
  this.pool = {};
  this.status = null;
  this.seeking = false;
  const handleCanplay = () => {
    const fns = this.pool.canplay || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this);
    }
  };
  const handlePlay = () => {
    if (this.seeking) return;
    const fns = this.pool.play || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this);
    }
  };
  const handlePause = () => {
    if (this.seeking) return;
    const fns = this.pool.pause || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this);
    }
  };
  const handleTimeUpdate = () => {
    if (this.seeking) return;
  
    const duration = this.ctx.duration;
    const currentTime = this.ctx.currentTime;
    
    const fns = this.pool.time_update || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this, currentTime, duration);
    }
  };
  const handleSeeked = () => {
    this.ctx.pause();
    if (this.status === 'playing') this.ctx.play();
    this.status = null;
    this.seeking = false;
    const fns = this.pool.seeked || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this);
    }
  };
  const handleEnded = () => {
    this.ctx.stop();
    const fns = this.pool.end || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this);
    }
  };
  const handleStop = () => {
    const fns = this.pool.stop || [];
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.call(this);
    }
  };
  this.ctx.onCanplay(handleCanplay);
  this.ctx.onPlay(handlePlay);
  this.ctx.onPause(handlePause);
  this.ctx.onTimeUpdate(handleTimeUpdate);
  this.ctx.onSeeked(handleSeeked);
  this.ctx.onEnded(handleEnded);
  this.ctx.onStop(handleStop);
}

AudioManager.prototype.init = function(url) {
  this.ctx.src = url;
  this.ctx.autoplay = true;
};

AudioManager.prototype.play = function() {
  this.ctx.play();
};

AudioManager.prototype.pause = function() {
  this.ctx.pause();
};
AudioManager.prototype.stop = function() {
  this.ctx.stop();
};

AudioManager.prototype.seek = function(num) {
  this.seeking = true;
  if (this.ctx.paused) {
    this.status = 'pause';
  } else {
    this.status = 'playing';
  }
  this.ctx.seek(num);
};

AudioManager.prototype.on = function(type, fn) {
  if (!eventName.has(type)) throw Error('illegal event name');
  if (typeof fn !== 'function') throw Error('argument fn must be a function');
  if (!this.pool[type]) this.pool[type] = [];
  this.pool[type].push(fn);
}

AudioManager.prototype.remove = function(type, fn) {
  if (!eventName.has(type)) throw Error('illegal event name');
  const fns = this.pool[type];
  if (!fns || fns.length === 0) return;
  if (fn) {
    fns.splice(fns.indexOf(fn), 1);
  } else {
    fns.length = 0;
  }
}

const audioInstance = new AudioManager();

module.exports = audioInstance;

