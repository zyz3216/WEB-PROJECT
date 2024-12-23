document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const images = container.getElementsByTagName("img");
  let currentIndex = 0;

  // 初始化显示
  function initializeSlider() {
    // 隐藏除第一张外的所有图片
    for (let i = 1; i < images.length; i++) {
      images[i].style.display = "none";
    }
  }

  // 切换图片
  function showNextImage() {
    // 隐藏当前图片
    images[currentIndex].style.display = "none";

    // 更新索引
    currentIndex = (currentIndex + 1) % images.length;

    // 显示下一张图片
    images[currentIndex].style.display = "block";
  }

  // 初始化
  initializeSlider();

  // 设置自动轮播
  setInterval(showNextImage, 3000);

  // 添加新闻导航交互
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 移除所有active类
      navItems.forEach((nav) => nav.classList.remove("nav-item-active"));
      // 添加active类到当前点击项
      this.classList.add("nav-item-active");
    });
  });
});
