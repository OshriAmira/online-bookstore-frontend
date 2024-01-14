import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  backgroundImagePath: string = 'assets/bookPictures/isrealBookWeek2.jpg';

  constructor() {
    // Simulate changing the banner text after a certain interval

    setInterval(() => {
      this.changeBackgroundImage();
      }, 3000);
  }

  

  // Function to change the background image
  changeBackgroundImage() {
    if (this.backgroundImagePath == 'assets/bookPictures/isrealBookWeek2.jpg') {
      this.backgroundImagePath = 'assets/bookPictures/israelBookWeek.png';
    }else {
        this.backgroundImagePath = 'assets/bookPictures/isrealBookWeek2.jpg';
      }
    }
    
  }



