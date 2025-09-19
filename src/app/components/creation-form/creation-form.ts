import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Creation } from '../../models/creation.model';

@Component({
  selector: 'app-creation-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creation-form.html',
  styleUrl: './creation-form.scss',
})
export class CreationForm {
  private formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);

  @Output() creationAdded = new EventEmitter<Creation>();

  creationForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    params: ['{"color": "#FF0000"}', Validators.required],
  });

  onSubmit(): void {
    if (this.creationForm.invalid) return;

    const formValue = this.creationForm.value;
    const creationData = {
      ...formValue,
      params: JSON.parse(formValue.params),
    };

    this.apiService.createCreation(creationData).subscribe((newCreation) => {
      console.log(`🤙 ~ CreationForm ~ onSubmit ~ newCreation:`, newCreation);

      this.creationAdded.emit(newCreation);
      this.creationForm.reset();
    });
  }
}
