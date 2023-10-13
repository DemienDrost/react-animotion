const preloadImages = {
  list: [] as HTMLImageElement[],
};

export default function useImagePreloader() {
  const preload = (images: string[]) => {
    const list = preloadImages.list;
    for (let i = 0; i < images.length; i++) {
      const img = new Image();
      img.onload = function () {
        const index = list.indexOf(img);
        if (index !== -1) {
          list.splice(index, 1);
        }
      };
      list.push(img);
      img.src = images[i];
    }
  };

  return {preload}
}
