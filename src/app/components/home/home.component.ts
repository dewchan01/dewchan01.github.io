import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'pw-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1000ms ease-in', style({ opacity: 1 })),
            ]),
        ]),
        trigger('fadeOut', [
            transition(':leave', [
                style({ opacity: 1 }),
                animate('1000ms ease-out', style({ opacity: 0 })),
            ]),
        ]),
        trigger('fadeOutFast', [
            transition(':leave', [
                style({ opacity: 1 }),
                animate('200ms ease-out', style({ opacity: 0 })),
            ])
        ]),
        trigger('slideLeftRight', [
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
          ]),
          transition(':leave', [
            animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
          ])
        ]),
    ]
})
export class HomeComponent implements OnInit {
    //@Input() showHomeContent = true;
    activeSection = '';
    isAboutUsPage = false;
    isPhoneView = false;
    isTabletView = false;
    isWebView = false;
    isLastAnimationInProgress = true;
    isAnimationInProgress = true;
    duration = 3000;
    faBars = faBars;
    faXmark = faXmark;
    menu = true;

    constructor(private router: Router,
        private breakpointObserver: BreakpointObserver,
        private renderer: Renderer2) {
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
            .subscribe(result => {
                this.isPhoneView = result.matches;
                if (this.isPhoneView) {
                    this.toggleMenu();
                }
            });
        this.breakpointObserver.observe([
        '(min-width: 768px) and (max-width: 1237px)' // Change this line
    ]).subscribe(result => {
            this.isTabletView = result.matches;
            if (this.isTabletView) {
                // this.toggleMenu();
            }
        });
        this.breakpointObserver.observe([
        '(min-width:1238px)']).subscribe(result => {
            this.isWebView = result.matches;
            if (this.isWebView && !this.menu) {
                this.toggleMenu();
            }
        })
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (((this.isPhoneView || this.isTabletView) && this.menu) || this.isAnimationInProgress) {
            this.renderer.setStyle(document.body, 'overflow', 'hidden');
        } else {
            this.renderer.setStyle(document.body, 'overflow', 'auto');
        }
    }
    ngOnInit() {
        if (this.isActive('/about-us')) {
            this.duration = 0
            this.isAboutUsPage = true;
        }

        setTimeout(() => {
            // Animation is complete
            this.isAnimationInProgress = false;
            this.renderer.setStyle(document.body, 'overflow', 'auto');

        }, this.duration);

        setTimeout(() => {
            // Last animation is complete
            this.isLastAnimationInProgress = false;
        }, this.duration + 2000);

        window.addEventListener('scroll', () => {
            this.checkSectionPositions();
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.activeSection = '';
            }
        })
    }

    toggleMenu() {
        this.menu = !this.menu;
        const nav = document.querySelector('nav');
        if (this.menu) {
            nav?.classList.add('black-nav');
            nav?.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }], { duration: 300, easing: 'ease-out' });
        } else {
            nav?.animate([{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }], { duration: 300, easing: 'ease-in' });
            setTimeout(() => {nav?.classList.remove('black-nav')},300);
        }
    }

    closeMenu() {
        if (this.menu && (this.isPhoneView || this.isTabletView)) {
            this.menu = !this.menu;
            const nav = document.querySelector('nav');
            nav?.animate([{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }], { duration: 300, easing: 'ease-in' });
            setTimeout(() => {nav?.classList.remove('black-nav')},300);
        }
        this.renderer.setStyle(document.body, 'overflow', 'auto');
        
    }

    scrollToHome() {
        this.activeSection = '';
        if (this.isPhoneView || this.isTabletView) {
            this.toggleMenu();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    scrollToEvent() {
        if ((this.isPhoneView || this.isTabletView) && this.menu) {
            this.toggleMenu();
        }
        let duration: number = 4000;
        this.router.navigate(['/home']);
        this.activeSection = 'event-details';
        if (this.isActive('/home')) {
            duration = 100;
        }
        setTimeout(() => {
            const headerHeight = document.querySelector('header')?.offsetHeight;
            const eventSection = document.getElementById('event-details');
            if (eventSection && headerHeight) {
                const offset = eventSection.offsetTop - headerHeight + 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, duration);
    }

    scrollToPrizes() {
        if (this.isPhoneView || this.isTabletView) {
            this.toggleMenu();
        }
        let duration: number = 4000;
        this.router.navigate(['/home']);
        this.activeSection = 'prizes';
        if (this.isActive('/home')) {
            duration = 100;
        }
        setTimeout(() => {
            const headerHeight = document.querySelector('header')?.offsetHeight;
            const prizesSection = document.getElementById('prizes');
            if (prizesSection && headerHeight) {
                const offset = prizesSection.offsetTop - headerHeight + 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, duration);
    }

    scrollToRules() {
        if ((this.isPhoneView || this.isTabletView) && this.menu) {
            this.toggleMenu();
        }
        let duration: number = 4000;
        this.router.navigate(['/home']);
        this.activeSection = 'rules';
        if (this.isActive('/home')) {
            duration = 100;
        }
        setTimeout(() => {
            const headerHeight = document.querySelector('header')?.offsetHeight;
            const rulesSection = document.getElementById('rules');
            if (rulesSection && headerHeight) {
                const offset = rulesSection.offsetTop - headerHeight - 40;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, duration);
    }

    scrollToFAQ() {
        if (this.isPhoneView || this.isTabletView) {
            this.toggleMenu();
        }
        let duration: number = 4000;
        this.router.navigate(['/home']);
        this.activeSection = 'faq';
        if (this.isActive('/home')) {
            duration = 100;
        }
        setTimeout(() => {
            const headerHeight = document.querySelector('header')?.offsetHeight;
            const faqSection = document.getElementById('faq');
            if (faqSection && headerHeight) {
                const offset = faqSection.offsetTop - headerHeight + 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, duration);
    }

    isActive(route: string) {
        return this.router.url === route;
    }

    checkSectionPositions() {
        let eventSectionTop: number = 0;
        let prizesSectionTop: number = 0;
        let rulesSectionTop: number = 0;
        let faqSectionTop: number = 0;
        const eventSection = document.getElementById('event-details');
        const prizesSection = document.getElementById('prizes');
        const rulesSection = document.getElementById('rules');
        const faqSection = document.getElementById('faq');
        const windowHeight = window.innerHeight;
        if (eventSection) {
            eventSectionTop = eventSection.getBoundingClientRect().top;
        }
        if (prizesSection) {
            prizesSectionTop = prizesSection.getBoundingClientRect().top;
        }
        if (rulesSection) {
            rulesSectionTop = rulesSection.getBoundingClientRect().top;
        }
        if (faqSection) {
            faqSectionTop = faqSection.getBoundingClientRect().top;
        }
        if (eventSectionTop < windowHeight && eventSectionTop > 0) {
            this.activeSection = 'event-details';
        } else if (faqSectionTop < windowHeight && faqSectionTop > -300) {
            this.activeSection = 'faq';
        } else if (rulesSectionTop < windowHeight && rulesSectionTop > 0) {
            this.activeSection = 'rules';
        } else if (prizesSectionTop < windowHeight && prizesSectionTop > 0) {
            this.activeSection = 'prizes';
        } else {
            this.activeSection = '';
        }
    }
}
