document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const buttons = Array.from(document.querySelectorAll(".carousel-btn"));

  if (!track || slides.length === 0) return;

  let index = 0;

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  function step(dir) {
    index = (index + dir + slides.length) % slides.length;
    update();
  }

  // Buttons
  buttons.forEach(btn => {
    btn.addEventListener("click", () => step(Number(btn.dataset.dir)));
  });

  // Wheel (horizontal preference)
  let wheelLock = false;
  window.addEventListener(
    "wheel",
    e => {
      if (wheelLock) return;
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      wheelLock = true;
      step(e.deltaX > 0 ? 1 : -1);
      setTimeout(() => (wheelLock = false), 600);
    },
    { passive: true }
  );

  // Touch swipe (horizontal)
  let startX = null;
  window.addEventListener(
    "touchstart",
    e => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchend",
    e => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      startX = null;
      if (Math.abs(dx) < 40) return;
      step(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  // Keyboard
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  function update() {
  const slide = slides[0];
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const stepPx = slide.getBoundingClientRect().width + gap;

  track.style.transform = `translateX(${-index * stepPx}px)`;

  const bar = document.querySelector(".carousel-progress-bar");
  if (bar) {
    const progress = ((index + 1) / slides.length) * 100;
    bar.style.width = `${progress}%`;
  }
}
window.addEventListener("resize", () => update());
});
