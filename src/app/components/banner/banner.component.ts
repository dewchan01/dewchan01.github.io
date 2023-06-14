import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { faCalendar, faClock, faHouse } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home/home.component';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'pw-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('flyThrough', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'translateY(-5%)',
        }),
        animate('4s ease-in-out', keyframes([
          style({
            opacity: '1',
            transform: 'translateY(0%)',
          })
        ])),
      ])
    ])
  ]
})

export class BannerComponent implements OnInit, OnDestroy {
  public faCalendar = faCalendar;
  public faClock = faClock;
  public faHouse = faHouse;
  boxShadow = '';
  public localTime!: string;
  public localDate!: string;
  public timerSubscription!: Subscription;

  constructor(private homeComponent: HomeComponent, private datePipe:DatePipe) {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.homeComponent.checkSectionPositions();
    })
    this.updateDateTime();

      this.timerSubscription = interval(1000).subscribe(() => {
      this.updateDateTime();;
    });
  }
    ngOnDestroy() {
      // Unsubscribe from the timer when the component is destroyed
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    }

  scrollToRules() {
    return this.homeComponent.scrollToRules();
  }

  private updateDateTime() {
    const currentDateTime = new Date();
    this.localDate = this.datePipe.transform(currentDateTime, 'dd MMM yyyy') || '';
    this.localTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit' });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;
    if (scrollTop > 400 && this.homeComponent.isWebView) {
      const shadowSpread = Math.min(20, 400 / 40 - (scrollTop - 400) / 40);
      const opacity = Math.min(0.5, 400 / 2000 - (scrollTop - 400) / 2000);
      this.boxShadow = `0 0 ${shadowSpread}px ${shadowSpread / 2}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 20}px ${shadowSpread / 2 + 10}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 40}px ${shadowSpread / 2 + 20}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 60}px ${shadowSpread / 2 + 30}px rgba(255,255,255,${opacity})`;
    } else if (this.homeComponent.isWebView) {
      this.boxShadow = '';
    } else {
      this.boxShadow = `0 0 20px 10px rgba(255, 255, 255, 0.5),
      0 0 40px 20px rgba(255, 255, 255, 0.3),
      0 0 60px 30px rgba(255, 255, 255, 0.2),
      0 0 80px 40px rgba(255, 255, 255, 0.1);`
    }
  }
}