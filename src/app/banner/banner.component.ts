import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  // bannerText: string = 'In honor of Israel Book Week';
  backgroundImagePath: string = 'assets/bookPictures/isrealBookWeek2.jpg';

  constructor() {
    // Simulate changing the banner text after a certain interval

    setInterval(() => {
      this.changeBackgroundImage();
      // this.backgroundImagePath = 'assets/bookPictures/israelBookWeek.png';
      }, 3000);

    // setInterval(() => {
    //   this.bannerText = '20% discount on the whole store';
    // }, 5000); // Change the text every 5 seconds
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



