import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { Creation } from './models/creation.model';
import { CommonModule } from '@angular/common';
import { CreationForm } from './components/creation-form/creation-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CreationForm],
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

  onCreationAdded(newCreation: Creation): void {
    this.creations.update((currenteCreation) => [...currenteCreation, newCreation]);
  }
}
