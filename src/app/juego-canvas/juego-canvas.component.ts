import { Component, OnInit } from '@angular/core';
import {SocketService} from '../socket.service';
import {CookieService} from 'ngx-cookie-service';
import {Configuracion} from '../Clases/configuracion';

@Component({
  selector: 'app-juego-canvas',
  templateUrl: './juego-canvas.component.html',
  styleUrls: ['./juego-canvas.component.css']
})
export class JuegoCanvasComponent implements OnInit {
  renderModal: boolean = false;

  constructor(private socketService:SocketService, private cookieService: CookieService){
    this.socketService.crearConexion();
    if (this.cookieService.check('configuracion')){
      //el creador de la partida
      let jsonConfig:any = JSON.parse(cookieService.get('configuracion'));
      console.log('creador de la partida');

      let configuracion = new Configuracion(jsonConfig.TIPO, jsonConfig.CONTRATIEMPO, jsonConfig.PISTA, jsonConfig.VUELTAS, jsonConfig.CANTJUGADORES, jsonConfig.TIEMPOSALA);
      console.log(configuracion);
      this.socketService.crearSala(configuracion);
    }else{
      console.log('los que se quieren unir.')
      //los demás usuarios.
    }
  }
  rendererModal(event: any){
    this.renderModal = event;
  }
  verEstadisticas(){
    this.renderModal = true;
  }

  ngOnInit(): void {
  }

}
