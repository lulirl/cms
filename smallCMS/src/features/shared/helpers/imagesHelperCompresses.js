export const compressAndResizeImage = (file, options) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const { maxWidth, maxHeight, quality } = options;
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > maxWidth) {
              width = maxWidth;
              height = width / aspectRatio;
            }
            if (height > maxHeight) {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob(
            (blob) => resolve(blob),
            'image/jpeg',
            quality
          );
        };
  
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    });
  }