import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { Creation } from './models/creation.model';
import { CommonModule } from '@angular/common';
import { CreationForm } from './components/creation-form/creation-form';
import { Button } from './components/ui/button/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CreationForm, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('generative-art-ui');

  // Usiamo la funzione inject() per ottenere l'istanza del nostro servizio
  private apiService = inject(ApiService);

  // Creiamo un signal per contenere i nostri dati in modo reattivo
  public creations = signal<Creation[]>([]);
  // SIGNAL per tenere traccia di quale elemento stiamo modificando
  public editingCreation = signal<Creation | null>(null);

  ngOnInit(): void {
    this.apiService.getCreations().subscribe((creations) => {
      this.creations.set(creations);
    });
  }

  onCreationAdded(newCreation: Creation): void {
    this.creations.update((currenteCreation) => [...currenteCreation, newCreation]);
  }

  onDeleteCreation(id: number): void {
    this.apiService.deleteCreation(id).subscribe(() => {
      // Quando la chiamata API ha successo, aggiorniamo il nostro signal
      // filtrando l'array per rimuovere l'elemento con l'ID eliminato.
      this.creations.update((currentCreations) =>
        currentCreations.filter((creation) => creation.id !== id)
      );
    });
  }

  // Chiamato quando si clicca "Modifica"
  onEditCreation(creation: Creation): void {
    this.editingCreation.set(creation);
  }

  // Gestisce l'evento dal form quando una modifica è completata
  onCreationUpdated(updatedCreation: Creation): void {
    // Aggiorniamo la lista sostituendo il vecchio elemento con quello nuovo
    this.creations.update((creations) => {
      return creations.map((c) => (c.id === updatedCreation.id ? updatedCreation : c));
    });
    // Resettiamo lo stato di modifica
    this.editingCreation.set(null);
  }
}
