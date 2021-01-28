import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoCanvasComponent } from './juego-canvas.component';

describe('JuegoCanvasComponent', () => {
  let component: JuegoCanvasComponent;
  let fixture: ComponentFixture<JuegoCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
