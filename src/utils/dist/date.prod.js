"use strict";function parseDate(e){var t=new Date;t.setTime(e);var a=t.getFullYear(),r=t.getMonth()+1,s=t.getDate(),n=(n=t.getHours())<10?"0"+n:n,o=(o=t.getMinutes())<10?"0"+o:o,u=(u=t.getSeconds())<10?"0"+u:u;return a+"年"+r+"月"+s+"日"}function hotDate(e){var t=new Date;t.setTime(e);var a=(a=t.getMonth()+1)<10?"0"+a:a,r=t.getDate();return a+"月"+(r=r<10?"0"+r:r)+"日"}function parseDate1(e){var t=new Date;t.setTime(e);var a=t.getFullYear(),r=(r=t.getMonth()+1)<10?"0"+r:r,s=(s=t.getDate())<10?"0"+s:s,n=(n=t.getHours())<10?"0"+n:n,o=(o=t.getMinutes())<10?"0"+o:o,u=(u=t.getSeconds())<10?"0"+u:u;return a+"-"+r+"-"+s}Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseDate=parseDate,exports.hotDate=hotDate,exports.parseDate1=parseDate1;