const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

const socket = io.connect('54.254.162.138:3000');

// Play button event
playBtn.addEventListener('click', () => {
  video.play();
  socket.emit('play');
});

// Pause button event
pauseBtn.addEventListener('click', () => {
  video.pause();
  socket.emit('pause');
});

// Sync video time
video.addEventListener('timeupdate', () => {
  socket.emit('timeUpdate', video.currentTime);
});

// Handle remote play/pause
socket.on('play', () => {
  if (video.paused) video.play();
});

socket.on('pause', () => {
  if (!video.paused) video.pause();
});

// Sync video time with other users
socket.on('timeUpdate', (time) => {
  if (Math.abs(video.currentTime - time) > 1) { // sync only if there's a significant difference
    video.currentTime = time;
  }
});
