import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  animations: [
    trigger('openClose', [
      // ...
      state('open',
        style({
          width: '200px',
          opacity: '1',
        })
      ),
      state('closed',
        style({
          width: '0',
          opacity: '0',
          overflow: 'hidden',
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.5s ease-in')]),
    ]),
  ],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  isOpen = true;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
