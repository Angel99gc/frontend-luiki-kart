import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstadisticasComponent } from './modal-estadisticas.component';

describe('ModalEstadisticasComponent', () => {
  let component: ModalEstadisticasComponent;
  let fixture: ComponentFixture<ModalEstadisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEstadisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
