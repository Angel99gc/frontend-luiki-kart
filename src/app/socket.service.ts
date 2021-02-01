import { Injectable} from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Configuracion} from './Clases/configuracion';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService  {
  socket: any;

  constructor() {
  }

  crearConexion(){
    this.socket = io(environment.URL_SERVIDOR);
  }
  crearSala(configuracion:Configuracion) {
    this.socket.emit('crearSala', configuracion);
  }
  unirseSala(data:JSON) {
    this.socket.emit('unirseSala', data);
  }
  getPartidas(){
    return new Observable((observable:any)=>{
      this.socket.on('getPartidasEspera', (partidas:any) => {
        observable.next(partidas);
      });
      return () => {};
    })
  }
  getPartida(){
    return new Observable((observable:any)=>{
      this.socket.on('getPartida', (partida:any) => {
        observable.next(partida);
      });
      return () => {};
    })
  }

}
