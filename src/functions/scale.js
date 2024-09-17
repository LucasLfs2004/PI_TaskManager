import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device

const guidelineBaseWidth = width < 550 ? 428 : 768;
const guidelineBaseHeight = width < 550 ? 926 : 1024;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isTablet = width > 550;

export { isTablet, moderateScale, scale, verticalScale, width };
