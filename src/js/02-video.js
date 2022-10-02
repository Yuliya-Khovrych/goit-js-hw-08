import Player from '@vimeo/player';
//console.log(Player);
var throttle = require('lodash.throttle');
//console.log(throttle);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

iframe.addEventListener('click', player.on);

player.on('timeupdate', function (data) {
  throttle(
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(data.seconds)
    ),
    1000
  );
  const savedTime = localStorage.getItem('videoplayer-current-time');
  console.log(savedTime);
  console.log('played the video!');
});

if (localStorage.getItem('videoplayer-current-time') !== null) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
