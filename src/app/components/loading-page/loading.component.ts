// External imports
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'pw-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('4s ease-in-out', style({ opacity: 1})),
    
      ]),
    ]),
  ],
})
export class LoadingComponent implements OnInit {
  animateLeftImage = true;
  animateRightImage = true;
  isSmallScreen = false;
  constructor(private homeComponent:HomeComponent){

  }
  ngOnInit(): void {
    if(this.homeComponent.isPhoneView || this.homeComponent.isTabletView){
      this.animateLeftImage = false;
      this.animateRightImage = false;
      this.isSmallScreen = true;
    }
  }

}