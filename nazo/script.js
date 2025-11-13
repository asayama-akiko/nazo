document.addEventListener("DOMContentLoaded", () => {
  // すべての見出し（has-line）を監視する
  const targets = document.querySelectorAll(".has-line");
  if (!targets.length) return;

  // IntersectionObserver のコールバック
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const heading = entry.target;

        // heading 内の path を探す（w-path or y-path）
        const path = heading.querySelector("path.w-path, path.y-path");
        if (!path) {
          // もし path が無ければ監視解除して次へ
          observer.unobserve(entry.target);
          return;
        }

        // path 長さを計算して初期値をセット（これで「隠れた線」から始める）
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        // トランジション（速くしたいので 1s に設定）
        path.style.transition =
          "stroke-dashoffset 3s cubic-bezier(.25,.8,.25,1)";

        // 少しだけ遅延して始めたいならここを変更（0〜1000）
        const delay = 300; // ms

        setTimeout(() => {
          // 強制的に reflow してブラウザに変化を認識させる
          path.getBoundingClientRect();
          // 終端へ（トランジションで描画される）
          path.style.strokeDashoffset = "0";
          // 任意でクラス付与（CSS のアニメ付けや他エフェクト用）
          heading.classList.add("animate-line");
        }, delay);

        // 1回だけ発火
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  // すべてのターゲットを監視
  targets.forEach((t) => io.observe(t));
});
