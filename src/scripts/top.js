import SimpleParallax from './class/simpleParallax.js';

const $window = $(window);
const animationClassName = 'is-animate';

function asyncExec (cb, time = 0) {
  setTimeout(cb, time);
}

function mainvisualAnimationSinglePhoto() {
  const $mainVisualImage = $('.js-MainVisual__image');
  $mainVisualImage.addClass(animationClassName);
}

// TODO: あとでこちらにする
function mainvisualAnimation() {
  const $mainVisualImage = $('.js-MainVisual__image');

  const maxVisualNum = 5;
  let count = 1;


  $mainVisualImage.addClass(animationClassName);

  $mainVisualImage.on('webkitAnimationEnd animationend', () => {

    count++;
    if (count > maxVisualNum) {
      count = 1;
    }

    $mainVisualImage
      .removeClass(animationClassName)
      .css({
        backgroundImage: `url(../images/standalone/top/mainvisual_${count}.jpg`
      });

    asyncExec(() => {
      $mainVisualImage.addClass(animationClassName);
    });

  });

}

$(() => {
  const simpleParallax = new SimpleParallax();
  simpleParallax.addElement('.js-MainVisual__image',  simpleParallax.checkIsPortrait() ? 0.2 : 0.4));
  simpleParallax.init();
});

$window.on('load', mainvisualAnimationSinglePhoto);
