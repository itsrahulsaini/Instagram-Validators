import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {
  Validators: any = {};
  constructor() {}
  async allowedFormat(param: File) {
    const file: File = param;
    if (file) {
      if (
        file.type.startsWith('image') &&
        this.Validators.allowedFormats.image.indexOf(file.type) !== -1
      ) {
        return await { FormatValid: true };
      } else if (
        file.type.startsWith('video') &&
        this.Validators.allowedFormats.video.indexOf(file.type) !== -1
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
        const maxresoltion = this.Validators.Resolution.image.maximum;
        const minresoltion = this.Validators.Resolution.image.minimum;
        // console.log(dimensions);
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
        // console.log(dimensions);
        const maxresoltion = this.Validators.Resolution.video.maximum;
        const minresoltion = this.Validators.Resolution.video.minimum;
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
        duration >= this.Validators.videLength.minimum &&
        duration <= this.Validators.videLength.maximum
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
    const file: File = param;

    if (file.type.startsWith('image')) {
      if (file.size > this.Validators.maxImageSize) {
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

      const imageAspectRatio =
        this.Validators.imageAspectRatio.split(/:| and |\//);

      if (
        (aspectRatio >= Number(imageAspectRatio[0]) ||
          aspectRatio >= Number(imageAspectRatio[1])) &&
        (aspectRatio <= Number(imageAspectRatio[2]) ||
          aspectRatio <= Number(imageAspectRatio[3]))
      ) {
        return await { ValidAspectRatio: true };
      } else {
        return await { ValidAspectRatio: false };
      }
    } else if (file.type.startsWith('video')) {
      if (file.size > this.Validators.maxVideoSize) {
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
      const videoAspectRatio =
        this.Validators.imageAspectRatio.split(/:| and |\//);
      if (
        (aspectRatio >= Number(videoAspectRatio[0]) ||
          aspectRatio >= Number(videoAspectRatio[1])) &&
        (aspectRatio <= Number(videoAspectRatio[2]) ||
          aspectRatio <= Number(videoAspectRatio[3]))
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
