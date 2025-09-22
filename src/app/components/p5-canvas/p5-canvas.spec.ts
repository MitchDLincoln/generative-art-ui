import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5Canvas } from './p5-canvas';

describe('P5Canvas', () => {
  let component: P5Canvas;
  let fixture: ComponentFixture<P5Canvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P5Canvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P5Canvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
