import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hackathon';

  circleX = window.innerWidth / 2;
  circleY = window.innerHeight / 2;
  targetX = window.innerWidth / 2;
  targetY = window.innerHeight / 2;
  easing = 0.05;

  @HostListener('window:resize')
  onWindowResize() {
    this.circleX = window.innerWidth / 2;
    this.circleY = window.innerHeight / 2;
    this.targetX = window.innerWidth / 2;
    this.targetY = window.innerHeight / 2;
  }

  onMouseMove(event: MouseEvent) {
    this.targetX = event.pageX;
    this.targetY = event.pageY;
  }
  

  updateCirclePosition() {
    // const dx = this.targetX - this.circleX -30;
    // const dy = this.targetY - this.circleY -30;
    const dx = this.targetX - this.circleX;
    const dy = this.targetY - this.circleY;
    this.circleX += dx * this.easing;
    this.circleY += dy * this.easing;
  }

  animate() {
    this.updateCirclePosition();
    requestAnimationFrame(() => this.animate());
  }

  ngOnInit() {
    this.animate();
  }
}

