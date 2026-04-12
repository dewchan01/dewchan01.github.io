// External imports
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
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
        animate('2s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('leftSlide', [
      transition(':enter', [
        animate('3s cubic-bezier(0.22, 1, 0.36, 1)', keyframes([
          style({ opacity: 0, transform: 'translate(-145%, -50%)', offset: 0 }),
          style({ opacity: 1, transform: 'translate(-130%, -50%)', offset: 0.15 }),
          style({ opacity: 1, transform: 'translate(-115%, -50%)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translate(-115%, -50%)', offset: 1 }),
        ]))
      ])
    ]),

    trigger('rightSlide', [
      transition(':enter', [
        animate('3s cubic-bezier(0.22, 1, 0.36, 1)', keyframes([
          style({ opacity: 0, transform: 'translate(20%, -50%)', offset: 0 }),
          style({ opacity: 1, transform: 'translate(8%, -50%)', offset: 0.15 }),
          style({ opacity: 1, transform: 'translate(-6%, -50%)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translate(-6%, -50%)', offset: 1 }),
        ]))
      ])
    ])
  ],
  standalone: false
})
export class LoadingComponent implements OnInit {
  animateLeftImage = true;
  animateRightImage = true;
  isSmallScreen = false;
  constructor(private homeComponent: HomeComponent) {

  }
  ngOnInit(): void {
    if (this.homeComponent.isPhoneView || this.homeComponent.isTabletView) {
      this.animateLeftImage = false;
      this.animateRightImage = false;
      this.isSmallScreen = true;
    }
  }

}