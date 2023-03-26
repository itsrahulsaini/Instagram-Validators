import { Injectable } from '@angular/core';

@Injectable()
export class InstagramValidatorServiceService {
  InstagramValidators = {
    allowedFormats: {
      video: ['video/mp4', 'video/mov', 'image/gif'],
      image: ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'],
    },
    Resolution: {
      video: {
        minimum: {
          width: 640,
          height: 640,
        },
        maximum: {
          width: 1080,
          height: 1920,
        },
      },
      image: {
        minimum: {
          width: 1080,
          height: 566,
        },
        maximum: {
          width: 2048,
          height: 2048,
        },
      },
    },
    videLength: {
      minimum: 3,
      maximum: 60,
    },
    captionLength: 2200,
    hashtagsLength: 30,
    videoAspectRatio: '1.91:1 and  9:16',
    imageAspectRatio: '1.91:1 and 4:5',
    maxVideoSize: 4294967296,
    maxImageSize: 31457280,
  };
  constructor() {}
  async allowedFormat(param: File) {
    const file: File = param;
    if (file) {
      if (
        file.type.startsWith('image') &&
        this.InstagramValidators.allowedFormats.image.indexOf(file.type) !== -1
      ) {
        return await { FormatValid: true };
      } else if (
        file.type.startsWith('video') &&
        this.InstagramValidators.allowedFormats.video.indexOf(file.type) !== -1
      ) {
        return await { FormatValid: true };
      } else {
        return await { FormatValid: false };
      }
    }
  }

  async validateDimensions(param: File) {
    const file: File = param;
    if (file) {
      if (file.type.startsWith('image')) {
        const imageElement = document.createElement('img');
        const imageLoaded = new Promise((resolve, reject) => {
          imageElement.addEventListener('load', () => {
            resolve({ width: imageElement.width, height: imageElement.height });
          });
          imageElement.addEventListener('error', reject);
        });
        imageElement.src = URL.createObjectURL(file);
        const dimensions: any = await imageLoaded;
        const maxresoltion = this.InstagramValidators.Resolution.image.maximum;
        const minresoltion = this.InstagramValidators.Resolution.image.minimum;
        if (
          dimensions.width >= minresoltion.width &&
          dimensions.width <= maxresoltion.width &&
          dimensions.height >= minresoltion.height &&
          dimensions.height <= maxresoltion.height
        ) {
          return await { ImageDimensionsValid: true };
        } else {
          return await { ImageDimensionsValid: false };
        }
      } else if (file.type.startsWith('video')) {
        const videoElement = document.createElement('video');
        const videoLoaded = new Promise((resolve, reject) => {
          videoElement.addEventListener('loadedmetadata', () => {
            resolve({
              width: videoElement.videoWidth,
              height: videoElement.videoHeight,
            });
          });
          videoElement.addEventListener('error', reject);
        });
        videoElement.src = URL.createObjectURL(file);
        const dimensions: any = await videoLoaded;
        console.log(dimensions);
        const maxresoltion = this.InstagramValidators.Resolution.video.maximum;
        const minresoltion = this.InstagramValidators.Resolution.video.minimum;
        if (
          dimensions.width >= minresoltion.width &&
          dimensions.width <= maxresoltion.width &&
          dimensions.height >= minresoltion.height &&
          dimensions.height <= maxresoltion.height
        ) {
          return { VideoDimensionsValid: true };
        } else {
          return { VideoDimensionsValid: false };
        }
      } else {
        return { ImageDimensionsValid: false };
      }
    }
  }

  async DurationValidate(param: File) {
    const file: File = param;
    if (file.type.startsWith('video')) {
      const videoElement = document.createElement('video');
      await new Promise((resolve, reject) => {
        videoElement.addEventListener('loadedmetadata', resolve);
        videoElement.addEventListener('error', reject);
        videoElement.src = URL.createObjectURL(file);
      });
      const duration = videoElement.duration;
      if (
        duration >= this.InstagramValidators.videLength.minimum &&
        duration <= this.InstagramValidators.videLength.maximum
      ) {
        return await { ValidDuration: true };
      } else {
        return await { ValidDuration: false };
      }
    } else if (file.type.startsWith('image')) {
      return await { ValidDuration: true };
    }
  }

  async aspectRatioValidator(param: File) {
    debugger;
    const file: File = param;

    if (file.type.startsWith('image')) {
      if (file.size > this.InstagramValidators.maxImageSize) {
        return await { maxSizeExceeded: true };
      }
      const imageElement = document.createElement('img');
      await new Promise((resolve, reject) => {
        imageElement.addEventListener('load', resolve);
        imageElement.addEventListener('error', reject);
        imageElement.src = URL.createObjectURL(file);
      });
      const width = imageElement.width;
      const height = imageElement.height;
      const aspectRatio = width / height;

      if (
        (aspectRatio >= 1.91 || aspectRatio >= 1) &&
        (aspectRatio <= 4 || aspectRatio <= 5)
      ) {
        return await { ValidAspectRatio: true };
      } else {
        return await { ValidAspectRatio: false };
      }
    } else if (file.type.startsWith('video')) {
      if (file.size > this.InstagramValidators.maxVideoSize) {
        return await { maxSizeExceeded: true };
      }
      const videoElement = document.createElement('video');
      await new Promise((resolve, reject) => {
        videoElement.addEventListener('loadedmetadata', resolve);
        videoElement.addEventListener('error', reject);
        videoElement.src = URL.createObjectURL(file);
      });
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;

      const aspectRatio = width / height;
      if (
        (aspectRatio >= 1.91 || aspectRatio >= 1) &&
        (aspectRatio <= 9 || aspectRatio <= 16)
      ) {
        return await { ValidAspectRatio: true };
      } else {
        return await { ValidAspectRatio: false };
      }
    } else {
      return await { ValidAspectRatio: false };
    }
  }
}
