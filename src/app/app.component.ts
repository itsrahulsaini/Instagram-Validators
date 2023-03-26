import { Component, OnInit, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { InstagramValidatorServiceService } from '../instagram/instagram-validator-service.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private Instagramvalidator: InstagramValidatorServiceService) {}

  ngOnInit(): void {}

  async change(event) {
    //debugger;
    const file: File = event.target.files[0];
    // console.log(file);

    if (file) {
      var allowedFormat = await this.Instagramvalidator.allowedFormat(file);
      var dimensionData = await this.Instagramvalidator.validateDimensions(
        file
      );
      var aspectRatio = await this.Instagramvalidator.aspectRatioValidator(
        file
      );
      var duration = await this.Instagramvalidator.DurationValidate(file);

      const combinedObject = Object.assign(
        {},
        allowedFormat,
        dimensionData,
        aspectRatio,
        duration,
        {}
      );

      console.log(combinedObject);
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
