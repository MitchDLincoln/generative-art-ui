import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { Creation } from './models/creation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('generative-art-ui');

  // Usiamo la funzione inject() per ottenere l'istanza del nostro servizio
  private apiService = inject(ApiService);

  // Creiamo un signal per contenere i nostri dati in modo reattivo
  public creations = signal<Creation[]>([]);

  ngOnInit(): void {
    this.apiService.getCreations().subscribe((creations) => {
      this.creations.set(creations);
    });
  }
}
