// 确保 Vue 已加载
function initVue() {
  if (typeof Vue !== "undefined") {
    Vue.component("card", {
      template: `
        <div class="card-wrap"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          :class="{ 'active': isActive, 'hovered': isHovered }"
          ref="card">
          <div class="card"
            :style="cardStyle">
            <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
            <div class="card-info" :style="cardInfoStyle">
              <div class="card-content" :style="cardContentStyle">
                <slot name="header"></slot>
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </div>`,
      props: {
        dataImage: {
          type: String,
          required: true,
        },
        index: {
          type: Number,
          default: 0,
        },
      },
      data: () => ({
        isHovered: false,
        isActive: false,
      }),
      computed: {
        cardStyle() {
          return {
            transform: this.getTransform(),
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          };
        },
        cardBgTransform() {
          return {
            transform:
              this.isHovered || this.isActive ? "scale(1.2)" : "scale(1.1)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          };
        },
        cardBgImage() {
          return {
            backgroundImage: `url(${this.dataImage})`,
          };
        },
        cardInfoStyle() {
          return {
            transform:
              this.isHovered || this.isActive
                ? "translateY(0)"
                : "translateY(100%)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          };
        },
        cardContentStyle() {
          return {
            opacity: this.isHovered || this.isActive ? 1 : 0,
            transform:
              this.isHovered || this.isActive
                ? "translateY(0)"
                : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          };
        },
      },
      methods: {
        getTransform() {
          let scale = this.isHovered || this.isActive ? 1.05 : 1;
          return `scale(${scale})`;
        },
        handleMouseEnter() {
          this.isHovered = true;
        },
        handleMouseLeave() {
          this.isHovered = false;
        },
        setActive(active) {
          this.isActive = active;
        },
      },
    });

    new Vue({
      el: "#character-cards",
      data: {
        currentIndex: 0,
        isScrolling: false,
        scrollInterval: null,
        autoPlayTimer: null,
        characters: [
          {
            id: 1,
            name: "奥菲莉亚",
            description:
              "圣女骑士，以信仰之火照亮人们的道路。来自寒冷的弗莱姆格雷斯，肩负着完成圣火仪式的使命。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Ophilia_Wallpaper01.jpg",
          },
          {
            id: 2,
            name: "赛勒斯",
            description:
              "学者，追寻知识的真理与智慧。来自阿特拉斯达姆王立学院的博学者，为解开古老的谜题而踏上旅程。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Cyrus_Wallpaper01.jpg",
          },
          {
            id: 3,
            name: "特蕾莎",
            description:
              "商人，追寻财富与冒险的年轻女孩。来自海边小镇兰布尔的商人学徒，梦想成为一名优的商人。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Tressa_Wallpaper01.jpg",
          },
          {
            id: 4,
            name: "奥尔贝克",
            description:
              "剑士，寻找重拾剑之意义的骑士。曾是王国最强骑士，如今为寻找新的人生意义而战。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Olberic_Wallpaper01.jpg",
          },
          {
            id: 5,
            name: "普莉姆萝洁",
            description:
              "舞者，为复仇而起舞的贵族之女。在黑暗中寻找杀害父亲的凶手，用舞蹈掩饰内心的痛苦。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Primrose_Wallpaper01.jpg",
          },
          {
            id: 6,
            name: "阿尔芬",
            description:
              "药剂师，治愈他人伤痛的温柔青年。来自清澈溪流镇的年轻药剂师，立志帮助所有需要帮助的人。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Alfyn_Wallpaper01.jpg",
          },
          {
            id: 7,
            name: "提利昂",
            description:
              "盗贼，带着秘密的孤独窃贼。精通偷盗技巧的神秘人，背负着不为人知的过去。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Therion_Wallpaper01.jpg",
          },
          {
            id: 8,
            name: "海茵特",
            description:
              "猎人，追寻导师足迹的森林守护者。来自雪域之森的女猎人，为寻找失踪的导师而展开冒险。",
            image:
              "../设定img/2560x1440/2560x1440_Desktop_OT_Haanit_Wallpaper01.jpg",
          },
        ],
      },
      methods: {
        initializeCarousel() {
          const container = document.querySelector(".character-container");
          const cards = container.querySelectorAll(".card-wrap");
          this.cardWidth = cards[0].offsetWidth + 30;
          this.totalCards = cards.length;
          this.cards = cards;

          this.currentIndex = 0;
          this.updateCardsPosition();
          this.updateActiveCard();
        },

        updateCardsPosition() {
          this.cards.forEach((card, index) => {
            const offset = index - this.currentIndex;
            const x = offset * this.cardWidth * 0.8;
            const z = Math.abs(offset) * -50;

            card.style.transform = `translateX(${x}px) translateZ(${z}px)`;
            card.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`;

            if (Math.abs(offset) > 2) {
              card.style.display = "none";
            } else {
              card.style.display = "block";
            }
          });
        },

        scrollToNext() {
          if (this.isScrolling) return;
          this.isScrolling = true;
          this.direction = 1;

          if (this.currentIndex === this.totalCards - 1) {
            this.currentIndex = 0;
          } else {
            this.currentIndex++;
          }

          this.updateCardsPosition();
          this.updateActiveCard();

          setTimeout(() => {
            this.isScrolling = false;
          }, 400);
        },

        scrollToPrev() {
          if (this.isScrolling) return;
          this.isScrolling = true;
          this.direction = -1;

          if (this.currentIndex === 0) {
            this.currentIndex = this.totalCards - 1;
          } else {
            this.currentIndex--;
          }

          this.updateCardsPosition();
          this.updateActiveCard();

          setTimeout(() => {
            this.isScrolling = false;
          }, 400);
        },

        updateCurrentIndex(index) {
          if (this.isScrolling) return;
          this.stopAutoScroll();

          // 如果点击当激活的指示器，重置到第一张
          if (index === this.currentIndex) {
            this.resetToFirst();
            return;
          }

          // 确定旋转方向
          this.direction = index > this.currentIndex ? 1 : -1;
          this.currentIndex = index;

          this.updateCardsPosition();
          this.updateActiveCard();
          this.startAutoScroll();
        },

        startAutoScroll() {
          if (this.scrollInterval) return;
          this.scrollInterval = setInterval(this.scrollToNext, 3000);
        },
        stopAutoScroll() {
          if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
          }
        },
        updateActiveCard() {
          this.cards.forEach((card, index) => {
            const cardComponent = card.__vue__;
            if (cardComponent) {
              cardComponent.setActive(index === this.currentIndex);
            }
          });
        },
        resetToFirst() {
          if (this.isScrolling) return;
          this.isScrolling = true;

          this.stopAutoScroll();
          this.direction = -1;
          this.currentIndex = 0;

          this.updateCardsPosition();
          this.updateActiveCard();

          setTimeout(() => {
            this.isScrolling = false;
            this.startAutoScroll();
          }, 400);
        },
        startAutoPlay() {
          if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
          }

          this.autoPlayTimer = setInterval(() => {
            this.scrollToNext();
          }, 2000);
        },

        stopAutoPlay() {
          if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
          }
        },

        handleCardClick(index) {
          // 如果正在滚动或点击当前激活的卡片，则不执行操作
          if (this.isScrolling || index === this.currentIndex) return;

          this.stopAutoPlay();
          this.isScrolling = true;

          // 确定滚动方向
          this.direction = index > this.currentIndex ? 1 : -1;
          this.currentIndex = index;

          // 更新卡片位置和状态
          this.updateCardsPosition();
          this.updateActiveCard();

          // 延迟重启自动播放
          setTimeout(() => {
            this.isScrolling = false;
            this.startAutoPlay();
          }, 400);
        },
      },
      mounted() {
        const container = document.querySelector(".character-container");

        // 预加载所有角色图片
        preloadImages(this.characters);

        this.$nextTick(() => {
          this.initializeCarousel();
          this.updateActiveCard();
          this.startAutoPlay();
        });

        // 设置3D效果
        container.style.perspective = "1000px";
        container.style.transformStyle = "preserve-3d";

        // 鼠标事件
        container.addEventListener("mouseenter", () => {
          this.stopAutoPlay();
        });

        container.addEventListener("mouseleave", () => {
          this.startAutoPlay();
        });

        // 键盘控制
        document.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") {
            this.scrollToPrev();
          } else if (e.key === "ArrowRight") {
            this.scrollToNext();
          }
        });

        // 窗口大小改变
        window.addEventListener("resize", () => {
          this.initializeCarousel();
        });

        // 触摸事件支持
        let touchStartX = 0;

        container.addEventListener("touchstart", (e) => {
          touchStartX = e.touches[0].clientX;
        });

        container.addEventListener("touchend", (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchEndX - touchStartX;

          if (Math.abs(diff) > 50) {
            // 最小滑动距离
            if (diff > 0) {
              this.scrollToPrev();
            } else {
              this.scrollToNext();
            }
          }
        });

        // 延迟加载非首屏图片
        lazyLoadImages();
      },
      beforeDestroy() {
        this.stopAutoScroll();
        this.stopAutoPlay();
        window.removeEventListener("resize", this.initializeCarousel);
      },
    });
  } else {
    // 如果 Vue 还没加载完成，等待一段时间后重试
    setTimeout(initVue, 100);
  }
}

// 当文档加载完成后初始化
document.addEventListener("DOMContentLoaded", initVue);

// 预加载图片
function preloadImages(characters) {
  characters.forEach((character) => {
    const img = new Image();
    img.src = character.image;
  });
}

// 延迟加载非首屏图片
function lazyLoadImages() {
  const images = document.querySelectorAll("[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}
