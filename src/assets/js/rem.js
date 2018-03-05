var docEl = document.documentElement;
var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
var recalc = function recalc() {
  var clientWidth = docEl.clientWidth
  if (clientWidth > 1024) {
    docEl.style.fontSize = 32 + 'px';
    return;
  };
  docEl.style.fontSize = 10 * clientWidth / 320 + 'px';
};

window.onload = function () {
  // recalc();
  // window.addEventListener(resizeEvt, recalc, false);
}
