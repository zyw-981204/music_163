export function parseDate(time) {
  var curDate = new Date();
  curDate.setTime(time);
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  // month = month < 10 ? '0'+month: month;
  var date = curDate.getDate();
  // date = date < 10 ? '0'+date: date;
  var hours = curDate.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  var minutes = curDate.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var seconds = curDate.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return year + '年' + month + '月' + date + '日';
};

export function hotDate(time) {
  var curDate = new Date();
  curDate.setTime(time);
  var month = curDate.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var date = curDate.getDate();
  date = date < 10 ? '0' + date : date;
  return month + '月' + date + '日';
};

export function parseDate1(time) {
  var curDate = new Date();
  curDate.setTime(time);
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var date = curDate.getDate();
  date = date < 10 ? '0' + date : date;
  var hours = curDate.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  var minutes = curDate.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var seconds = curDate.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return year + '-' + month + '-' + date;
};