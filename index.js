const viewBtn = document.getElementById("view-invite-btn");
const overlay = document.getElementById("balloon-overlay");

const BALLOON_COLORS = [
  "#ff7675", "#fd79a8", "#eccc68", "#ff6b81",
  "#70a1ff", "#7bed9f", "#a29bfe", "#00cec9"
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createBalloon(index, isMobile) {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  
  const string = document.createElement("div");
  string.className = "balloon-string";
  balloon.appendChild(string);

  // Randomize shapes slightly for an organic look
  const rLeft = 50 + Math.random() * 10;
  const rRight = 50 + Math.random() * 10;
  const rBottom = 40 + Math.random() * 10;
  balloon.style.borderRadius = `${rLeft}% ${rRight}% ${rBottom}% ${rBottom}% / 40% 40% 60% 60%`;

  // Responsive Edge Padding: Keeps balloons safely inside narrow screens
  const minLeft = isMobile ? 8 : 4;
  const maxLeft = isMobile ? 84 : 92;
  const randomLeft = minLeft + Math.random() * (maxLeft - minLeft);

  // Responsive Sway: Reduces side-to-side swing on small mobile viewports
  const maxSwing = isMobile ? 25 : 60;
  const randomSwing = -maxSwing + Math.random() * (maxSwing * 2);

  // Apply CSS Custom Variables
  balloon.style.setProperty("--color", BALLOON_COLORS[index % BALLOON_COLORS.length]);
  balloon.style.setProperty("--left", `${randomLeft}%`);
  balloon.style.setProperty("--delay", `${index * (isMobile ? 0.08 : 0.05)}s`);
  balloon.style.setProperty("--duration", `${2.0 + Math.random() * 1.2}s`);
  balloon.style.setProperty("--swing", `${randomSwing}px`);
  balloon.style.setProperty("--tilt", `${-12 + Math.random() * 24}deg`);
  balloon.style.setProperty("--opacity", `${0.85 + Math.random() * 0.15}`);
  
  // A randomized sizing modifier multiplier (interacts beautifully with CSS clamp)
  balloon.style.setProperty("--size-factor", `${0.8 + Math.random() * 0.5}`);

  return balloon;
}

function launchBalloons(callback) {
  overlay.innerHTML = "";
  overlay.classList.add("active");

  const isMobile = window.innerWidth < 600;
  // Dynamic count: Fewer balloons needed to look full on mobile, more on desktop
  const count = isMobile ? 16 : 36;

  for (let i = 0; i < count; i++) {
    overlay.appendChild(createBalloon(i, isMobile));
  }

  setTimeout(callback, prefersReducedMotion ? 200 : 2000);
}

viewBtn.addEventListener("click", () => {
  if (viewBtn.disabled) return;
  viewBtn.disabled = true;

  const href = viewBtn.dataset.href;

  if (prefersReducedMotion) {
    window.location.href = href;
    return;
  }

  document.querySelector(".page").classList.add("page--leaving");

  launchBalloons(() => {
    window.location.href = href;
  });
});
