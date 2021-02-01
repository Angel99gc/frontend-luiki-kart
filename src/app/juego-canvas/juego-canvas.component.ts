import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {CookieService} from 'ngx-cookie-service';
import {Configuracion} from '../Clases/configuracion';
import {Partida} from '../Clases/partida';
import Swal from "sweetalert2";
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-juego-canvas',
  templateUrl: './juego-canvas.component.html',
  styleUrls: ['./juego-canvas.component.css']
})
export class JuegoCanvasComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  //renderiza el modal de estadisticas
  renderModal: boolean = false;
  //renderiza el juego
  renderJuego = false;
  //datos a rellenar del jugador
  usuario = ""; //nombre de usuario
  private _listaAutos = ['Rojo', 'Amarillo','Verde', 'Azul'];
  indexAuto = 0;


  //datos del  juego.
  partida:any;
  constructor(private socketService:SocketService, private cookieService: CookieService,  private router:Router){

  }


  ngOnInit(): void {
    this.socketService.crearConexion()
    //crea la partida solo si es necesario;
    this.crearPartida();
    //Hacer el observable de facil
    this.subscription.add(this.socketService.getPartida().subscribe((data:any)=>{
      console.log('partida emitida');
      console.log(data);
      this.partida = data
    }));
    console.log('getPartida logrado')
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


  getAuto(): string {
    return this._listaAutos[this.indexAuto];
  }

  editIndexAuto(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this.indexAuto!=0) return this.indexAuto--;
      else return this.indexAuto=this._listaAutos.length-1

    }else{
      if (this.indexAuto+1 != this._listaAutos.length) return this.indexAuto++;
      else return this.indexAuto=0;
    }
  }

  /** Usa cookies para obtener la informacion del componente anterior y crear la partida en el servidor **/
  crearPartida(){
    //Solo si es el creador de la partida.
    if (this.cookieService.check('configuracion')){
      let jsonConfig:any = JSON.parse(this.cookieService.get('configuracion'));
      console.log('creador de la partida');

      let configuracion = new Configuracion(jsonConfig.TIPO, jsonConfig.CONTRATIEMPO, jsonConfig.PISTA, jsonConfig.VUELTAS, jsonConfig.CANTJUGADORES, jsonConfig.TIEMPOSALA);
      console.log(configuracion)
      this.socketService.crearSala(configuracion);
    }
  }
  agregarUsuario(){
    let data:any;

    //un nuevo usuario se une a la y se agrega como jugador
    if(this.cookieService.check('idPartida')){
      data = {
        idPartida:this.cookieService.get('idPartida'),
        nombre:this.usuario,
        carro: this._listaAutos[this.indexAuto]
      }
    }
    else{//el creador se agrega como jugador
      data = {
        idPartida:0,
        nombre:this.usuario,
        carro: this._listaAutos[this.indexAuto]
      }
    }
    console.log(this.partida);
    this.subscription.add(this.socketService.unirseSala(data))
    this.renderJuego = true;
  }

}
