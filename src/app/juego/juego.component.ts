import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {Subscription} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Partida} from '../Clases/partida';
import {Jugador} from '../Clases/jugador';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  private subscription = new Subscription();
  //renderiza el modal de estadisticas
  renderModal: boolean = false;
  //Manejo del tiempo
  esperando:boolean = true;
  tiempoEspera:any=9999;
  tiempo:any=0;

  //usados para dibujar en canvas
  private canvas: any;
  private ctx: any;

  //datos del  juego.
  idPartida:any;
  partida:Partida;
  jugadores:any=[]
  nombreJugador:any;

  constructor(private socketService:SocketService, private cookieService:CookieService) {
    this.nombreJugador = this.cookieService.get('usuario');
    //inicializo partida
    this.partida = new Partida(0,'Prueba','Carrera','','',1,3,'',[])
  }

  ngOnInit(): void {
    //id de la partida a jugar
    this.idPartida = this.cookieService.get('idPartida');
    this.subscription.add(this.socketService.updatePartida(this.idPartida));

    this.subscription.add(this.socketService.getPartida().subscribe((data:any)=>{
      this.jugadores = [];
      this.partida = new Partida(data.id, data.estado, data.tipo, data.contratiempo, data.pista, data.vueltas, data.cantJugadores, data.tiempoSala, data.jugadores);
      for(let index in this.partida.listaJugadores){
        this.jugadores.push(this.partida.listaJugadores[index])
      }
      if (this.partida.estado == 'iniciada') this.esperando = false;

      console.log('Partida emitida:');
      console.log(this.jugadores);
    }));
    this.subscription.add(this.socketService.getTiempoEspera().subscribe((segundos:any)=>{
      this.tiempoEspera = segundos;
    }));
    this.subscription.add(this.socketService.getTiempoCarrera().subscribe((segundos:any)=>{
      this.tiempo = segundos
    }));
  }
  ngAfterViewInit(){
    this.canvas = <HTMLCanvasElement> document.getElementById("juego");
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(150, 150);
    this.ctx.lineTo(150, 650);
    this.ctx.moveTo(400, 0);
    this.ctx.lineTo(400, 150);
    this.ctx.moveTo(150, 650);
    this.ctx.lineTo(650, 650);
    this.ctx.moveTo(650, 650);
    this.ctx.lineTo(650, 150);
    this.ctx.moveTo(650, 150);
    this.ctx.lineTo(150, 150);
    this.ctx.stroke();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  /** Usado para renderizar el modal **/
  rendererModal(event: any){
    this.renderModal = event;
  }
  verEstadisticas(){
    this.renderModal = true;
  }


  //da inicio a la carrea con el click en empezar
  startCarrera(){
    let data:any = {
      idPartida:this.idPartida
    }
    this.esperando = false;
    this.socketService.iniciarPartida(data);
  }

  // Detecta los eventos al presionar tecla
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event:any){
    if(!this.esperando){
      let data:any = {
        idPartida: this.idPartida,
        nombre: this.nombreJugador
      }
      //detectamos las teclas para el cambio de direccion
      if(event.code == 'ArrowUp'){
        data.direccion = 'arriba';
        this.subscription.add(this.socketService.setDireccionJugador(data));
      }else if(event.code == 'ArrowDown'){
        data.direccion = 'abajo';
        this.subscription.add(this.socketService.setDireccionJugador(data));
      }else if(event.code == 'ArrowLeft'){
        data.direccion = 'izquierda';
        this.subscription.add(this.socketService.setDireccionJugador(data));
      }else if(event.code == 'ArrowRight'){
        data.direccion = 'derecha';
        this.subscription.add(this.socketService.setDireccionJugador(data));
      }else if(event.key == 'Shift'){
        this.subscription.add(this.socketService.avanzarJugador(data));
      }
    }
  }


}
