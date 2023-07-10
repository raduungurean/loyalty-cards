export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
export const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
export const generateRandomString = () => {
  return Math.random().toString(36).substr(2, 10);
}

export const getTextColor = (backgroundColor) => {
  if (!backgroundColor) {
    return null;
  }
  const hexColor = backgroundColor.replace('#', '');
  const red = parseInt(hexColor.substr(0, 2), 16);
  const green = parseInt(hexColor.substr(2, 2), 16);
  const blue = parseInt(hexColor.substr(4, 2), 16);

  // Calculate the relative luminance of the color
  const relativeLuminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

  // Use a threshold value to determine the text color
  const threshold = 0.5;
  const textColor = relativeLuminance > threshold ? '#000000' : '#FFFFFF';

  return {
    primary: textColor,
    paragraph: darkenHexColor(textColor, 20),
  };
};

export const darkenHexColor = (hexColor, amount) => {
  hexColor = hexColor.replace('#', '');

  // Convert the hex color to RGB
  var red = parseInt(hexColor.substr(0, 2), 16);
  var green = parseInt(hexColor.substr(2, 2), 16);
  var blue = parseInt(hexColor.substr(4, 2), 16);

  // Decrease the intensity of each RGB component
  red = Math.max(0, red - amount);
  green = Math.max(0, green - amount);
  blue = Math.max(0, blue - amount);

  // Convert the updated RGB values back to a hex color code
  var darkenedHex =
    '#' +
    red.toString(16).padStart(2, '0') +
    green.toString(16).padStart(2, '0') +
    blue.toString(16).padStart(2, '0');

  return darkenedHex;
}