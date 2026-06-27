const viewBtn = document.getElementById("view-invite-btn");
const overlay = document.getElementById("balloon-overlay");

const BALLOON_COLORS = [
  "#f472b6", "#fb923c", "#facc15", "#4ade80",
  "#60a5fa", "#c084fc", "#f87171", "#8e7ab5",
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createBalloon(index) {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.setProperty("--color", BALLOON_COLORS[index % BALLOON_COLORS.length]);
  balloon.style.setProperty("--left", `${8 + Math.random() * 84}%`);
  balloon.style.setProperty("--delay", `${index * 0.08}s`);
  balloon.style.setProperty("--duration", `${2.2 + Math.random() * 0.8}s`);
  balloon.style.setProperty("--swing", `${-20 + Math.random() * 40}px`);
  balloon.style.setProperty("--size", `${28 + Math.random() * 22}px`);
  return balloon;
}

function launchBalloons(callback) {
  overlay.innerHTML = "";
  overlay.classList.add("active");

  const count = window.innerWidth < 480 ? 14 : 22;
  for (let i = 0; i < count; i++) {
    overlay.appendChild(createBalloon(i));
  }

  setTimeout(callback, prefersReducedMotion ? 200 : 2400);
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
