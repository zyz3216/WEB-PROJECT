document.addEventListener("DOMContentLoaded", () => {
  // 导航栏滚动效果
  let lastScroll = 0;
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
      // 向下滚动
      nav.style.transform = "translateY(-100%)";
    } else {
      // 向上滚动
      nav.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // 滚动显示动画
  const scrollReveal = () => {
    const cards = document.querySelectorAll(".scroll-reveal");

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const triggerBottom = window.innerHeight * 0.8;

      if (cardTop < triggerBottom) {
        card.classList.add("visible");
      }
    });
  };

  // 初始检查
  scrollReveal();

  // 滚动时检查
  window.addEventListener("scroll", scrollReveal);

  // 搜索功能
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      // 这里添加搜索逻辑
      console.log("搜索:", searchTerm);
    }
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  let isPlaying = false;

  // 音乐控制
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    } else {
      bgMusic.play().catch(function (error) {
        console.log("播放失败:", error);
      });
      musicToggle.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  // 页面可见性改变时控制音乐
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove("playing");
      }
    } else {
      if (isPlaying) {
        bgMusic.play().catch(function (error) {
          console.log("恢复播放失败:", error);
        });
        musicToggle.classList.add("playing");
      }
    }
  });

  // 音量渐变效果
  bgMusic.volume = 0.5; // 设置初始音量

  // 自动播放（需要用户交互）
  document.addEventListener(
    "click",
    function initAudio() {
      if (!isPlaying) {
        bgMusic
          .play()
          .then(function () {
            isPlaying = true;
            musicToggle.classList.add("playing");
          })
          .catch(function (error) {
            console.log("自动播放失败:", error);
          });
      }
      document.removeEventListener("click", initAudio);
    },
    { once: true }
  );
});
