import { Component, OnInit, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ValidatorService } from '../Validators/validator.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private validatorService: ValidatorService) {}
  validationErrorHandler: any = [];
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
          width: 320,
          height: 320,
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
    frameRate: {
      minimum: 30,
      maximum: 60,
    },
  };
  FacebookValidators = {
    allowedFormats: {
      video: ['video/mp4', 'video/mov', 'video/avi', 'video/wmw'],
      image: ['image/jpeg', 'image/png', 'image/gif'],
    },
    Resolution: {
      video: {
        minimum: {
          width: 600,
          height: 315,
        },
        maximum: {
          width: 2048,
          height: 2048,
        },
      },
      image: {
        minimum: {
          width: 200,
          height: 200,
        },
        maximum: {
          width: 2048,
          height: 2048,
        },
      },
    },
    videLength: {
      minimum: 1,
      maximum: 120,
    },
    captionLength: 5000,
    hashtagsLength: 30,
    videoAspectRatio: '1.91:1 and  9:16',
    imageAspectRatio: '1.91:1 and 4:5',
    maxVideoSize: 4294967296,
    maxImageSize: 26214400,
    frameRate: {
      minimum: 30,
      maximum: 60,
    },
  };

  LinkedInValidators = {
    allowedFormats: {
      video: ['video/mp4'],
      image: ['image/jpeg', 'image/png'],
    },
    Resolution: {
      video: {
        minimum: {
          width: 256,
          height: 144,
        },
        recommended: {
          width: 1280,
          height: 720,
        },
        maximum: {
          width: 4096,
          height: 2304,
        },
      },
      image: {
        minimum: {
          width: 400,
          height: 400,
        },
        recommended: {
          width: 1200,
          height: 627,
        },
        maximum: {
          width: 8192,
          height: 8192,
        },
      },
    },
    videoLength: {
      minimum: 1,
      maximum: 10 * 60, // 10 minutes
    },
    captionLength: 2200, // LinkedIn allows up to 2,200 characters for captions
    hashtagsLength: 30,
    videoAspectRatio: '1:2.4 and  2.4:1',
    imageAspectRatio: '1.91:1 and 4:5',
    maxVideoSize: 5368709120,
    maxImageSize: 15728640,
    frameRate: {
      minimum: 30,
      recommended: 60,
      maximum: 60,
    },
  };
  PinterestValidators = {
    allowedFormats: {
      video: ['video/mp4', 'video/mov', 'video/3gpp', 'video/quicktime'],
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    },
    Resolution: {
      video: {
        minimum: {
          width: 240,
          height: 240,
        },
        maximum: {
          width: 1920,
          height: 1080,
        },
      },
      image: {
        minimum: {
          width: 1080,
          height: 2100,
        },
        maximum: {
          width: 1920,
          height: 2100,
        },
      },
    },
    videoLength: {
      minimum: 4,
      maximum: 60,
    },
    captionLength: 500,
    hashtagsLength: 20,
    videoAspectRatio: '1:1,  9:16',
    imageAspectRatio: '1:1, 4:5',
    // videoAspectRatio: '1:2.4 and  2.4:1',
    // imageAspectRatio: '1.91:1 and 4:5',
    maxVideoSize: 2147483648,
    maxImageSize: 33554432,
    frameRate: {
      minimum: 24,
      maximum: 60,
    },
  };
  ngOnInit(): void {}

  async change(event) {
    this.validationErrorHandler = [];
    const file: File = event.target.files[0];
    if (file) {
      this.validatorService.Validators = this.InstagramValidators;
      const instagramValidateStatus = Object.assign(
        { name: 'Instagram' },
        await this.validatorService.allowedFormat(file),
        await this.validatorService.validateDimensions(file),
        await this.validatorService.aspectRatioValidator(file),
        await this.validatorService.DurationValidate(file)
      );
      this.validatorService.Validators = this.FacebookValidators;
      const facebookValidateStatus = Object.assign(
        { name: 'Facebook' },
        await this.validatorService.allowedFormat(file),
        await this.validatorService.validateDimensions(file),
        await this.validatorService.aspectRatioValidator(file),
        await this.validatorService.DurationValidate(file)
      );
      this.validatorService.Validators = this.LinkedInValidators;
      const LinkedInValidateStatus = Object.assign(
        { name: 'LinkedIn' },
        await this.validatorService.allowedFormat(file),
        await this.validatorService.validateDimensions(file),
        await this.validatorService.aspectRatioValidator(file),
        await this.validatorService.DurationValidate(file)
      );
      this.validatorService.Validators = this.PinterestValidators;
      const PintrestValidateStatus = Object.assign(
        { name: 'Pintrest' },
        await this.validatorService.allowedFormat(file),
        await this.validatorService.validateDimensions(file),
        await this.validatorService.aspectRatioValidator(file),
        await this.validatorService.DurationValidate(file)
      );
      this.validationErrorHandler.push(
        instagramValidateStatus,
        facebookValidateStatus,
        LinkedInValidateStatus,
        PintrestValidateStatus
      );

      console.log(this.validationErrorHandler);
      // console.log('Instagram:', instagramValidateStatus);
      // console.log('Facebook:', facebookValidateStatus);
    }
  }

  // validateDimensions(param: File) {
  //   const file: File = param;
  //   if (file) {
  //     if (file.type.startsWith('image')) {
  //       const imageElement = document.createElement('img');
  //       imageElement.addEventListener('load', () => {
  //         const width = imageElement.width;
  //         const height = imageElement.height;
  //         const maxresoltion =
  //           this.InstagramValidators.Resolution.image.maximum;
  //         const minresoltion =
  //           this.InstagramValidators.Resolution.image.minimum;
  //         if (
  //           (width >= minresoltion.width &&
  //           width <= maxresoltion.width )&&(
  //           height >= minresoltion.height &&
  //           height <= maxresoltion.height)
  //         ) {
  //           return { ImageDimensionsValid: true };
  //         } else {
  //           return { ImageDimensionsValid: false };
  //         }
  //       });
  //       imageElement.src = URL.createObjectURL(file);
  //     } else if (file.type.startsWith('video')) {
  //       const videoElement = document.createElement('video');
  //       videoElement.addEventListener('loadedmetadata', () => {
  //         const width = videoElement.videoWidth;
  //         const height = videoElement.videoHeight;
  //         const maxresoltion =
  //           this.InstagramValidators.Resolution.video.maximum;
  //         const minresoltion =
  //           this.InstagramValidators.Resolution.video.minimum;

  //         if (
  //           (width >= minresoltion.width &&
  //           width <= maxresoltion.width) &&
  //           (height >= minresoltion.height &&
  //           height <= maxresoltion.height)
  //         ) {
  //           return { VideoDimensionsValid: true };
  //         } else {
  //           return { VideoDimensionsValid: false };
  //         }
  //       });
  //       videoElement.src = URL.createObjectURL(file);
  //     } else {
  //       return { ImageDimensionsValid: false };

  //     }
  //   }
  // }

  // async aspectRatioVideoValidator(param: File) {
  //   const file: File = param;

  //   if (file.type.startsWith('image')) {
  //     if (file.size > 4 * 1024 * 1024) {
  //       return { maxSizeExceeded: true }; // Image file size is too large
  //     }
  //     const imageElement = document.createElement('img');
  //     imageElement.addEventListener('load', () => {
  //       const width = imageElement.width;
  //       const height = imageElement.height;
  //       const aspectRatio = width / height;
  //       if (aspectRatio >= 1.91 / 1 && aspectRatio <= 4 / 5) {
  //         return { ValidAspectRatio: true };
  //       } else {
  //         return { ValidAspectRatio: false };
  //       }
  //     });
  //     imageElement.src = URL.createObjectURL(file);
  //   } else if (file.type.startsWith('image')) {
  //     const videoElement = document.createElement('video');
  //     videoElement.addEventListener('loadedmetadata', () => {
  //       const width = videoElement.videoWidth;
  //       const height = videoElement.videoHeight;
  //       const aspectRatio = width / height;

  //       if (aspectRatio >= 1.91 / 1 && aspectRatio <= 9 / 16) {
  //         return { ValidAspectRatio: true };
  //       } else {
  //         return { ValidAspectRatio: false };
  //       }
  //     });

  //     videoElement.src = URL.createObjectURL(file);
  //   } else {
  //     return { ValidAspectRatio: false };
  //   }
  // }
}
