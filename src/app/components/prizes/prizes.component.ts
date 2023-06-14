import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { faEnvelope, faMedal, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home/home.component';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'pw-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms', style({ transform: 'translateX(0)' })),
      ]),
    ])]
})

export class PrizesComponent implements OnInit {
  public faEnvelope = faEnvelope;
  public faGithub = faGithub;
  public faLinkedIn = faLinkedinIn;
  boxShadow = ''

  constructor(private homeComponent: HomeComponent) { }
  ngOnInit(): void { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;
    let newScrollTop = scrollTop - 1900;
    if (newScrollTop >= 200 && newScrollTop <= 800 && this.homeComponent.isWebView) {
      const shadowSpread = newScrollTop / 40; // adjust this value to control the amplitude
      const opacity = newScrollTop / 2000; // adjust this value to control the opacity
      this.boxShadow = `0 0 ${shadowSpread}px ${shadowSpread / 2}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 20}px ${shadowSpread / 2 + 10}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 40}px ${shadowSpread / 2 + 20}px rgba(255,255,255,${opacity}),
        0 0 ${shadowSpread + 60}px ${shadowSpread / 2 + 30}px rgba(255,255,255,${opacity})`;

    } else if (newScrollTop > 800 && this.homeComponent.isWebView) {
      const shadowSpread = 800 / 40 - (newScrollTop - 800) / 40; // adjust this value to control the amplitude
      const opacity = 800 / 2000 - (newScrollTop - 800) / 2000; // adjust this value to control the opacity
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
