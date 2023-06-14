import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'pw-circuit-svg',
  templateUrl: './circuit-svg.component.html',
  styleUrls: ['./circuit-svg.component.scss']
})

export class CircuitSvgComponent implements AfterViewInit {

  @ViewChild('svgElement') svgElement!: ElementRef;
  ngAfterViewInit(): void {
   
    window.addEventListener('scroll', () => {
      const svgPath = document.querySelectorAll('.flow-line path');
      const gradient = document.querySelector('#SvgjsLinearGradient4524');
      const scrollTop = document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollTop / maxScroll;
      const startColor = '#007cc3';
      const endColor = '#ff00ff';
      const color = this.interpolateColor(startColor, endColor, scrollPercent);
      if (svgPath && gradient) {
        svgPath.forEach(path => path.setAttribute('stroke', `url(#${gradient.getAttribute('id')})`));
        gradient.querySelectorAll('stop:first-of-type')?.forEach(stop => stop?.setAttribute('stop-color', color));
        console.log(svgPath,gradient);
      }
    });
  }

  private interpolateColor(startColor: string, endColor: string, percent: number): string {
    const start = this.hexToRgb(startColor);
    const end = this.hexToRgb(endColor);
    const diffR = end.r - start.r;
    const diffG = end.g - start.g;
    const diffB = end.b - start.b;
    const r = Math.floor(start.r + diffR * percent);
    const g = Math.floor(start.g + diffG * percent);
    const b = Math.floor(start.b + diffB * percent);
    return this.rgbToHex(r, g, b);
  }
  

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));  
    console.log(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}