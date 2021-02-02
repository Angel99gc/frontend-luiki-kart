import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import  Swal  from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


import { DataService } from '../data.service';
import { Carrera } from '../Clases/carrera';

@Component({
  selector: 'app-modal-ranking',
  templateUrl: './modal-ranking.component.html',
  styleUrls: ['./modal-ranking.component.css']
})
export class ModalRankingComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  @Output() Render: EventEmitter<any>;

  private _listaJuegos: Carrera[] = [];
  private _isEmptyList: boolean = false;

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {
    this.Render = new EventEmitter();
  }

  get listaJuegos(): any {
    return this._listaJuegos;
  }

  get isEmptyList(): boolean {
    return this._isEmptyList;
  }

  ngOnInit() {
    this.getListaJuegosFinalizados();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.Render.emit(false);
  }

  getListaJuegosFinalizados() {
    this.spinner.show();
    this.subscription.add(this.dataService.GetListaJuegosFinalizados().subscribe(
      response => {
        console.log(response);
        let listaTemporal:any;
        listaTemporal = response;
        listaTemporal = listaTemporal.response.data;
        if (listaTemporal.length == 0) {
          this._isEmptyList = true;
        } else {
          //se convertiria en clase si es eficiente segun el profe.
          listaTemporal.forEach( (juego:any) =>{
              console.log(juego)
              let carrera = new Carrera(juego.ID, juego.GANADOR, juego.TIEMPO, juego.PISTA, juego.VUELTAS);
              this._listaJuegos.push(carrera);
            });

        }
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Error desde el Angular')
        } else {
          console.log('Error desde el Servidor')
          Swal.fire({
            title: 'Error al conectar con el servidor.',
            text: 'Inténte de nuevo más tarde.',
            icon: 'error',
            timer: 5000,
            showConfirmButton: false,
          })
        }
        this.spinner.hide();
        // @ts-ignore debido a que siempre existirá el boton para cerrar el modal.
        document.getElementById('closeModalBTN').click();
      }
    ));
  }
}

