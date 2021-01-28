import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SocketService} from '../socket.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Jugador} from '../Clases/jugador';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-estadisticas',
  templateUrl: './modal-estadisticas.component.html',
  styleUrls: ['./modal-estadisticas.component.css']
})
export class ModalEstadisticasComponent implements OnInit {

  @Output() Render: EventEmitter<any>;

  private _listaJugadores: Jugador[] = [];


  constructor(private socketService: SocketService, private spinner: NgxSpinnerService, private cookieService:CookieService, private router:Router) {
    this.Render = new EventEmitter();

  }

  ngOnInit(): void {
  }

  get listaJugadores(): Jugador[] {
    return this._listaJugadores;
  }

  closeModal() {
    this.Render.emit(false);
    this.router.navigate(['inicio'])
  }
}

