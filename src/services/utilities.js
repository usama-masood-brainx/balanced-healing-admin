export const dataURLtoFile = (dataUrl, fileName) => {
  let arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

export const isCorrectImageRatio = (file, success, fail) => {
  let image = new Image();
  image.src = window.URL.createObjectURL(file);
  image.onload = function () {
    const w = this.width;
    const h = this.height;
    if (
      Math.ceil(h / w) === 2 ||
      Math.ceil(h / w) === 3 ||
      Math.floor(h / w) === 2 ||
      Math.floor(h / w) === 2
    ) {
      success();
      return;
    }
    fail();
    return;
  };
};
