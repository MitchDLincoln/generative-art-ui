import { Button } from './../ui/button/button';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Creation } from '../../models/creation.model';

@Component({
  selector: 'app-creation-form',
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './creation-form.html',
  styleUrl: './creation-form.scss',
})
export class CreationForm implements OnChanges {
  private formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);

  // Riceverà i dati dal componente genitore
  @Input() creationToEdit: Creation | null = null;

  // Emettiamo eventi diversi per creazione e modifica
  @Output() creationAdded = new EventEmitter<Creation>();
  @Output() creationUpdated = new EventEmitter<Creation>();

  creationForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    params: ['{"color": "#FF0000"}', Validators.required],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['creationToEdit'] && this.creationToEdit) {
      // Se riceviamo una creation da modificare, popoliamo il form
      this.creationForm.patchValue({
        name: this.creationToEdit.name,
        author: this.creationToEdit.author,
        params: JSON.stringify(this.creationToEdit.params, null, 2),
      });
    } else {
      // Altrimenti, ci assicuriamo che il form sia vuoto
      this.creationForm.reset();
    }
  }

  onSubmit(): void {
    if (this.creationForm.invalid) return;

    const formValue = this.creationForm.value;
    const creationData = {
      ...formValue,
      params: JSON.parse(formValue.params),
    };

    // Logica condizionale: siamo in modalità modifica o creazione?
    if (this.creationToEdit) {
      // MODALITÀ MODIFICA
      this.apiService
        .updateCreation(this.creationToEdit.id, creationData)
        .subscribe((updatedCreation) => {
          this.creationUpdated.emit(updatedCreation);
          this.creationForm.reset();
        });
    } else {
      // MODALITÀ CREAZIONE
      this.apiService.createCreation(creationData).subscribe((newCreation) => {
        this.creationAdded.emit(newCreation);
        this.creationForm.reset();
      });
    }
  }
}
