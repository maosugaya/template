import ScrollChecker from './scrollChecker.js';

export default class SimpleParallax {

  constructor () {
    this.scrollChecker = new ScrollChecker();
    this.$window = $(window);

    const originalWidth = 1280;
    const originalHeight = 853;
    this.originalAspect = originalHeight / originalWidth;

    this.isPortrait = false;
    this.elements = [];
  }

  checkIsPortrait () {
    this.isPortrait = ((this.$window.height() - this.$window.width()) > 0);
    return this.isPortrait;
  }

  addElement (selector, fliction = 0.4, isNoVerticalOffset = false) {
    this.elements.push({
      selector: selector,
      fliction: fliction,
      isNoVerticalOffset: isNoVerticalOffset
    });
  }


  init () {
    this.checkIsPortrait();

    this.elements.forEach((element) => {
      this.scrollChecker.add([{
        selector: element.selector,
        func: (obj) => {
          const fliction = element.fliction
          const verticalOffset = (this.isPortrait || element.isNoVerticalOffset) ? 0 : (obj.height * this.originalAspect / 2);
          console.log(element.isNoVerticalOffset);
          obj.$elem.css({
            backgroundPosition: `center ${((this.scrollChecker.scrollPositionTop - obj.positionTop) - verticalOffset) * fliction}px`
      //      filter: `blur(${this.scrollChecker.scrollPositionTop * 0.01}px)`
          });
        }
      }])
    });

    this.scrollChecker.init();
    this.$window.on('resize', this.checkIsPortrait.bind(this));
  }
}

