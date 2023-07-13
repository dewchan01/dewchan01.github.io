import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'pw-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent implements OnInit, AfterViewInit {
  boxShadow = '';

  @ViewChild('container', { static: false }) container!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const list = this.container.nativeElement.querySelectorAll('li');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    list.forEach(paragraph => {
      observer.observe(paragraph);
    });
  }

  public rules: string[] = [
    'DIP Project - Solar Tracker',
    'Todo-List Application',
    'My Github Profile',
    'My Personal Site',
    'IM Backend Server',
    'DSAI Project',
    'Netflix Extension',
    'Coming Soon',
    'Coming Soon',
    'Coming Soon',
  ];

  public githubUrls: string[] = [
    'https://github.com/dewchan01/solar-tracker',
    'https://github.com/dewchan01/To-Do-List-application',
    'https://github.com/dewchan01/dewchan01',
    'https://github.com/dewchan01/dewchan01.github.io',
    'https://github.com/dewchan01/assignment_demo_2023',
    'https://github.com/dewchan01/dsai-project',
    'https://github.com/dewchan01/netflix-extension',
    '#',
    '#',
    '#'
  ];

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.updateVisibleRules();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = event.target.documentElement.scrollTop;
    let newScrollTop = scrollTop - 1200;
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
  visibleRules: string[] = [];
  ruleIndex: number = 0;
  maxVisibleRules: number = 5 ;

  updateVisibleRules() {
    this.visibleRules = this.rules.slice(this.ruleIndex, this.ruleIndex + this.maxVisibleRules);
  }

  scrollLeft() {
    if (this.ruleIndex <= this.rules.length && this.ruleIndex >= this.maxVisibleRules) {
      this.ruleIndex -= this.maxVisibleRules;
    }
    else if (this.ruleIndex === 0) {
      this.ruleIndex = this.rules.length - (this.maxVisibleRules);
    }
    
    this.updateVisibleRules();
  }

  scrollRight() {
    this.ruleIndex += this.maxVisibleRules;

    if (this.ruleIndex >=this.rules.length) {
      this.ruleIndex = 0;
    }

    this.updateVisibleRules();
  }
}
