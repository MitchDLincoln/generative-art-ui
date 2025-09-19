import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationForm } from './creation-form';

describe('CreationForm', () => {
  let component: CreationForm;
  let fixture: ComponentFixture<CreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
