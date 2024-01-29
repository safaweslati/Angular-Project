import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorImage',
})
export class ErrorImagePipe implements PipeTransform {
  transform(imageUrl: string | undefined): string {
    if (!imageUrl) {
      console.log('no images');
      return 'assets/images/no-image.png';
    }
    return imageUrl;
  }
}
