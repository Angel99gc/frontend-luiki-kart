import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Configuracion} from './Clases/configuracion';

@Injectable()
export class SocketService {

  socket: any;
  constructor() {
  }

  crearConexion(){
    return this.socket = io(environment.URL_SERVIDOR);
  }
  crearSala(configuracion:Configuracion) {
    return this.socket.emit('crearSala', configuracion);
  }
  getPartidas(){
    this.socket.on('getPartidas', (partidas:any) =>{
      console.log(partidas);
    });
  }

}
