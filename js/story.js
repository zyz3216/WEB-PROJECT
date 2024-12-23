var cards,
  nCards,
  cover,
  openContent,
  openContentText,
  pageIsOpen = false,
  openContentImage,
  closeContent,
  windowWidth,
  windowHeight,
  currentCard;

// 初始化
init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

// 选择DOM元素
function selectElements() {
  cards = document.querySelectorAll("#story .card");
  nCards = cards.length;
  cover = document.getElementById("cover");
  openContent = document.getElementById("open-content");
  openContentText = document.getElementById("open-content-text");
  openContentImage = document.getElementById("open-content-image");
  closeContent = document.getElementById("close-content");
}

// 添加事件监听
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener("click", onCloseClick);
  window.addEventListener("resize", resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener("click", function (e) {
    e.preventDefault();
    var card = getCardElement(e.target);
    onCardClick(card, i);
  });
}

/* 点击卡片时的处理 */
function onCardClick(card, i) {
  currentCard = card;
  currentCard.className += " clicked";
  setTimeout(function () {
    animateCoverUp(currentCard);
  }, 500);
  animateOtherCards(currentCard, true);
  openContent.className += " open";
}

function animateCoverUp(card) {
  var cardPosition = card.getBoundingClientRect();
  var cardStyle = getComputedStyle(card);

  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);

  // 根据卡片标题设置不同的内容
  var content = "";
  switch (card.querySelector("h1").textContent) {
    case "史诗般的冒险":
      content = `<h1>史诗般的冒险</h1>
            <p>在奥斯特拉大陆，八位不同身份的旅人，将展开各自独特的故事。每个人都带着自己的使命和梦想，踏上了不同的旅途。</p>
            <p>从雪山之巅到炎热沙漠，从繁华都市到宁静村庄，他们的足迹将遍布这片大陆的每个角落。</p>`;
      break;
    case "奥斯特拉大陆":
      content = `<h1>奥斯特拉大陆</h1>
            <p>这是一片充满魔法与奇迹的土地，这里有着古老的传说和未解的谜题。从神圣的教会到神秘的学院，从商人云集的港口到盗贼横行的地下城。</p>
            <p>每个地区都有其独特的文化和历史，等待着玩家去探索和发现。</p>`;
      break;
    case "命运的交织":
      content = `<h1>命运的交织</h1>
            <p>看似独立的八条故事线，实则暗藏着深层的联系。随着冒险的深入，他们的命运逐渐交织在一起，共同揭开这片大陆上的重大秘密。</p>
            <p>每个角色都有着自己的使命，而这些看似独立的使命，最终将指向一个更宏大的命运。</p>`;
      break;
    case "选择与分支":
      content = `<h1>选择与分支</h1>
            <p>在旅途中，玩家将面临各种选择。每个决定都可能影响故事的走向，带来不同的结果。通过不同的选择，体验不同的剧情分支。</p>
            <p>你的选择将决定角色的命运，也将影响整个世界的未来。</p>`;
      break;
  }

  openContentText.innerHTML = content;
  openContentImage.src = card.querySelector("img").src;

  setTimeout(function () {
    window.scroll(0, 0);
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  cover.style.transform = "scaleX(1) scaleY(1) translate3d(0, 0, 0)";
  setTimeout(function () {
    openContentText.innerHTML = "";
    openContentImage.src = "";
    cover.style.width = "0px";
    cover.style.height = "0px";
    pageIsOpen = false;
    currentCard.className = currentCard.className.replace(" clicked", "");
  }, 301);
}

function setCoverPosition(cardPosition) {
  cover.style.left = cardPosition.left + "px";
  cover.style.top = cardPosition.top + "px";
  cover.style.width = cardPosition.width + "px";
  cover.style.height = cardPosition.height + "px";
}

function setCoverColor(cardStyle) {
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX =
    (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY =
    (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  cover.style.transform =
    "scaleX(" +
    scaleX +
    ") scaleY(" +
    scaleY +
    ") translate3d(" +
    offsetX +
    "px, " +
    offsetY +
    "px, 0px)";
}

function onCloseClick(e) {
  e.preventDefault();
  e.stopPropagation();

  openContent.className = openContent.className.replace(" open", "");

  animateCoverBack(currentCard);
  animateOtherCards(currentCard, false);

  setTimeout(function () {
    window.scrollTo({
      top: document.getElementById("story").offsetTop,
      behavior: "smooth",
    });
  }, 300);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

function animateOutCard(card, delay) {
  setTimeout(function () {
    card.className += " out";
  }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function () {
    card.className = card.className.replace(" out", "");
  }, delay);
}

function getCardElement(el) {
  if (el.className && el.className.indexOf("card") > -1) return el;
  else return getCardElement(el.parentElement);
}

function resize() {
  if (pageIsOpen) {
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

// 添加ESC键关闭功能
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && pageIsOpen) {
    onCloseClick(e);
  }
});

// 添加点击背景关闭功能
openContent.addEventListener("click", function (e) {
  if (e.target === openContent) {
    onCloseClick(e);
  }
});
