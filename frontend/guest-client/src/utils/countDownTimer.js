export default function countDownTimer(hr, mm, ss) {
  console.log(hr, mm, ss);
  var hours = parseInt(hr);
  var minutes = parseInt(mm);
  var seconds = parseInt(ss);
  console.log(hours, minutes, seconds);
  // var interval = setInterval(function () {
  //   if (hr === 0 && mm === 0 && ss === 0) {
  //     clearInterval(interval);
  //     console.log('done');
  //   }
  // }, 1000);
}
