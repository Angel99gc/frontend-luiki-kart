import { Injectable} from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService  {
  socket: any;

  constructor() {
  }

  crearConexion(){
    this.socket = io(environment.URL_SERVIDOR);
  }
  crearSala(configuracion:JSON) {
    this.socket.emit('crearSala', configuracion);
  }
  unirseSala(data:JSON) {
    this.socket.emit('unirseSala', data);
  }
  iniciarPartida(data:JSON) {
    this.socket.emit('iniciarPartida', data);
  }
  //actualiza la partida a todos en la sala.
  updatePartida(Id:number){
    this.socket.emit('updatePartida', Id);
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
  getIdSala(){
    return new Observable((observable:any)=>{
      this.socket.on('getIdSala', (id:any) => {
        observable.next(id);
      });
      return () => {};
    })
  }
  getTiempoEspera(){
    return new Observable((observable:any)=>{
      this.socket.on('tiempoEspera', (segundos:any) => {
        observable.next(segundos);
      });
      return () => {};
    })
  }
  getTiempoCarrera(){
    return new Observable((observable:any)=>{
      this.socket.on('tiempoCarrera', (segundos:any) => {
        observable.next(segundos);
      });
      return () => {};
    })
  }
}
