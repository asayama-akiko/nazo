// ハンバーガーメニュー
const hamburger = document.getElementById("js-hamburger");
const navLinks = document.getElementById("js-nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navLinks.classList.toggle("is-active");
});

// タイトルの動く線
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".has-line");
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const heading = entry.target;
        const path = heading.querySelector("path.w-path, path.y-path");
        if (!path) {
          observer.unobserve(heading);
          return;
        }

        // 線の長さを取得
        const length = path.getTotalLength();

        // 初期状態（完全に隠す）
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = "none";

        // reflow（これ重要）
        path.getBoundingClientRect();

        // スルッとした動き（少し長め＋自然な easing）
        path.style.transition =
          "stroke-dashoffset 1.6s cubic-bezier(.22,.61,.36,1)";

        // 少し遅らせると上品
        requestAnimationFrame(() => {
          path.style.strokeDashoffset = "0";
          heading.classList.add("animate-line");
        });

        // 1回だけ
        observer.unobserve(heading);
      });
    },
    {
      threshold: 0.3, // タイトルが30%見えたら発火
    }
  );

  targets.forEach((t) => io.observe(t));
});
