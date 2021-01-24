import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import  Swal  from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


import { DataService } from '../data.service';

@Component({
  selector: 'app-modal-ranking',
  templateUrl: './modal-ranking.component.html',
  styleUrls: ['./modal-ranking.component.css']
})
export class ModalRankingComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  @Output() Render: EventEmitter<any>;

  ListaJuegos: any;

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {
    this.Render = new EventEmitter();
  }

  ngOnInit() {
    this.getListaJuegosFinalizados();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  closeModal(){
    this.Render.emit(false);
  }
  getListaJuegosFinalizados(){
    this.spinner.show();
    this.subscription.add(this.dataService.GetListaJuegosFinalizados().subscribe(
        response => {

          this.ListaJuegos = response;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log('Error desde el Angular')
          }else {
            console.log('Error desde el Servidor')
            Swal.fire({
              title: 'Error, operación fallida.',
              text: 'Error al conectar con el servidor. Intentelo de nuevo.',
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
