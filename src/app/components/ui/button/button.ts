import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definiamo i tipi di varianti che il nostro bottone può accettare
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class Button {
  // @Input() permette al genitore di passare un valore per questa proprietà.
  // Es: <app-button variant="primary"></app-button>
  @Input() variant: ButtonVariant = 'primary';

  // Aggiungiamo anche un input per disabilitare il bottone
  @Input() disabled: boolean = false;
}
