function fixVideos() {
  const allVideos = document.querySelectorAll('video');

  allVideos.forEach(function(video) {
    video.removeAttribute('controls');
    video.controls = false;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video['playsinline'] = true;

    if (video.offsetParent !== null) {
      video.play().catch(() => {});
    }
  });
}

document.addEventListener('DOMContentLoaded', fixVideos);
setInterval(fixVideos, 1000);