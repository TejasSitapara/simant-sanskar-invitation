/* Scroll reveal */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => observer.observe(el));

/* Gender poll — one vote per user, locked after submit */
const POLL_KEY = "simant-poll-vote";
const pollCards = document.querySelectorAll(".poll-card");
const pollResult = document.getElementById("poll-result");
let pollLocked = false;

function lockPoll(selectedVote) {
  pollLocked = true;
  pollCards.forEach((c) => {
    c.disabled = true;
    c.classList.add("poll-card--locked");
    c.classList.toggle("selected", c.dataset.vote === selectedVote);
  });
}

function showPollResult(vote) {
  const isBoy = vote === "boy";
  const label = isBoy ? "કાનો" : "ગોપી";
  pollResult.textContent = `તમે "${label}" પસંદ કર્યું ✓`;
}

const savedVote = localStorage.getItem(POLL_KEY);
if (savedVote === "boy" || savedVote === "girl") {
  lockPoll(savedVote);
  showPollResult(savedVote);
}

pollCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (pollLocked) return;

    const vote = card.dataset.vote;
    localStorage.setItem(POLL_KEY, vote);
    lockPoll(vote);
    showPollResult(vote);
  });
});

/* Guest counters */
document.querySelectorAll(".counter-item").forEach((item) => {
  const minus = item.querySelector(".counter-btn--minus");
  const plus = item.querySelector(".counter-btn--plus");
  const valueEl = item.querySelector(".counter-value");
  let count = 0;

  minus.addEventListener("click", () => {
    if (count > 0) {
      count--;
      valueEl.textContent = count;
    }
  });

  plus.addEventListener("click", () => {
    if (count < 20) {
      count++;
      valueEl.textContent = count;
    }
  });
});

/* RSVP form */
const rsvpForm = document.getElementById("rsvp-form");
const rsvpSuccess = document.getElementById("rsvp-success");

rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  rsvpForm.style.display = "none";
  rsvpSuccess.classList.add("show");
});

/* Music toggle */
const musicFab = document.getElementById("music-fab");
let playing = false;

musicFab.addEventListener("click", () => {
  playing = !playing;
  musicFab.classList.toggle("playing", playing);
  musicFab.textContent = playing ? "🔊" : "🎵";
});

