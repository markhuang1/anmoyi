var antmove_export = {};

/* eslint-disable */
function tabClass(active, ellipsis) {
  var classes = ['tab-class'];

  if (active) {
    classes.push('tab-active-class');
  }

  if (ellipsis) {
    classes.push('van-ellipsis');
  }

  return classes.join(' ');
}

function tabStyle(active, ellipsis, color, type, disabled, activeColor, inactiveColor, swipeThreshold, scrollable) {
  var styles = [];
  var isCard = type === 'card'; // card theme color

  if (color && isCard) {
    styles.push('border-color:' + color);

    if (!disabled) {
      if (active) {
        styles.push('background-color:' + color);
      } else {
        styles.push('color:' + color);
      }
    }
  }

  var titleColor = active ? activeColor : inactiveColor;

  if (titleColor) {
    styles.push('color:' + titleColor);
  }

  if (scrollable && ellipsis) {
    styles.push('flex-basis:' + 88 / swipeThreshold + '%');
  }

  return styles.join(';');
}

function tabCardTypeBorderStyle(color, type) {
  var isCard = type === 'card';
  var styles = [];

  if (isCard && color) {
    styles.push('border-color:' + color);
  }

  return styles.join(';');
}

function trackStyle(data) {
  if (!data.animated) {
    return '';
  }

  return ['transform: translate3d(' + -100 * data.currentIndex + '%, 0, 0)', '-webkit-transition-duration: ' + data.duration + 's', 'transition-duration: ' + data.duration + 's'].join(';');
}

antmove_export.tabClass = tabClass;
antmove_export.tabStyle = tabStyle;
antmove_export.trackStyle = trackStyle;
antmove_export.tabCardTypeBorderStyle = tabCardTypeBorderStyle;
export default antmove_export;