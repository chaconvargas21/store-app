import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() images: string[] = [];
  @Input() title: string = '';

  @ViewChild('track') track!: ElementRef<HTMLDivElement>;

  // Desplaza el 80% del ancho visible, para que la última imagen quede a la
  // vista como referencia de dónde se estaba.
  scroll(direction: 'prev' | 'next'): void {
    const el = this.track.nativeElement;
    const amount = el.clientWidth * 0.8 * (direction === 'next' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
