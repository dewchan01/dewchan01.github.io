import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'pw-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements AfterViewInit {
  boxShadow: string = '';

  constructor(private homeComponent: HomeComponent) { }
  @ViewChild('container', { static: false }) container!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const paragraphs = this.container.nativeElement.querySelectorAll('p');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    paragraphs.forEach(paragraph => {
      observer.observe(paragraph);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;
    if (scrollTop >= 200 && scrollTop <= 800 && this.homeComponent.isWebView) {
      const shadowSpread = scrollTop / 40; // adjust this value to control the amplitude
      const opacity = scrollTop / 2000; // adjust this value to control the opacity
      this.boxShadow = `0 0 ${shadowSpread}px ${shadowSpread / 2}px rgba(255,255,255,${opacity}),
      0 0 ${shadowSpread + 20}px ${shadowSpread / 2 + 10}px rgba(255,255,255,${opacity}),
      0 0 ${shadowSpread + 40}px ${shadowSpread / 2 + 20}px rgba(255,255,255,${opacity}),
      0 0 ${shadowSpread + 60}px ${shadowSpread / 2 + 30}px rgba(255,255,255,${opacity})`;

    } else if (scrollTop > 800 && this.homeComponent.isWebView) {
      const shadowSpread = 800 / 40 - (scrollTop - 800) / 40; // adjust this value to control the amplitude
      const opacity = 800 / 2000 - (scrollTop - 800) / 2000; // adjust this value to control the opacity
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
