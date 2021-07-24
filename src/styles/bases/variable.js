import { lightenDarkenColor } from "../../utils/util.js";

const backgroundColor = "#cccccc31";
const fontFamily = "Boston";
const fontFamilyHeavy = "BostonHeavy";
const themeColorPrimary = "#a44a3f";
const themeColorPrimaryDark = lightenDarkenColor(themeColorPrimary, +10);
const themeColorPrimaryLight = lightenDarkenColor(themeColorPrimary, -10);
const themeColorSecondary = "#000";
const themeColorSecondaryDark = lightenDarkenColor(themeColorSecondary, +10);
const themeColorSecondaryLight = lightenDarkenColor(themeColorSecondary, -10);
const themeColorWhite = "#fff";
const themeColorBlack = "#000";
const themeColorDanger = "#da0000";
const errorBackgroundColor = "#ffdbd9";
const errorColor = "#f44336";
const warningColor = "#757575";
const successColor = "#4bb543";
const headerHeigth = "70px";

export const variables = {
  backgroundColor,
  fontFamily,
  fontFamilyHeavy,
  themeColorPrimaryDark,
  themeColorPrimaryLight,
  themeColorSecondary,
  themeColorSecondaryDark,
  themeColorSecondaryLight,
  themeColorWhite,
  themeColorBlack,
  themeColorDanger,
  errorBackgroundColor,
  errorColor,
  warningColor,
  successColor,
  headerHeigth,
};
