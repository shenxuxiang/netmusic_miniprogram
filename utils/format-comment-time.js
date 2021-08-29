const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

function isYesterday(targetTime) {
  const currentTime = Date.now();
  const today = new Date(currentTime - currentTime % ONE_DAY);
  return today - (targetTime - targetTime % ONE_DAY) === ONE_DAY;
}

function isToday(targetTime) {
  const currentTime = Date.now();
  return targetTime - targetTime % ONE_DAY === currentTime - currentTime % ONE_DAY;
}

function getHours(dt) {
  const h = dt.getHours() + '';
  return h.length > 1 ? h : '0' + h;
}

function getMinutes(dt) {
  const m = dt.getMinutes() + '';
  return m.length > 1 ? m : '0' + m;
}

function formatCommentTime(time) {
  const date = new Date(time);
  if (isToday(time)) {
    const dist = Date.now() - date.getTime();
    if (dist < ONE_HOUR) {
      return `${Math.floor(dist / ONE_MINUTE)}分钟前`;
    } else {
      return getHours(date) + ':' + getMinutes(date);
    }
  } else if (isYesterday(time)) {
    return `昨天${getHours(date)}:${getMinutes(date)}`;
  } else {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${getHours(date)}:${getMinutes(date)}`;
  }
}

module.exports = formatCommentTime;