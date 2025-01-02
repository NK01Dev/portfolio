import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: false,
  
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';
}
