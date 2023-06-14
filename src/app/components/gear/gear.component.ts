import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'pw-gear',
    templateUrl: './gear.component.html',
    styleUrls: [ './gear.component.scss' ]
})

export class GearComponent implements OnInit {

    gears: HTMLElement[] = [];
    lastScroll!: number;
  
    constructor(private el: ElementRef) { }
  
    ngOnInit(): void {
      this.gears = Array.from(this.el.nativeElement.querySelectorAll('.gear'));
    }
  
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: Event): void {
      const currentScroll = window.pageYOffset;
      const delta = currentScroll - (this.lastScroll || currentScroll);
      let rotation = delta;
      this.gears.forEach((gear: HTMLElement) => {
        console.log(gear)
        const currentRotation = parseInt(gear.dataset['rotation'] || '0');
        if (gear.classList.contains('gear-2')) {
          rotation = -delta;
        }
        console.log(rotation);
        gear.style.transform = `rotate(${currentRotation + rotation}deg)`;
        gear.dataset['rotation'] = `${currentRotation + rotation}`;
      });
      this.lastScroll = currentScroll;
    }
}
