import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {CookieService} from 'ngx-cookie-service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-juego-canvas',
  templateUrl: './juego-canvas.component.html',
  styleUrls: ['./juego-canvas.component.css']
})
export class JuegoCanvasComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  //renderiza el juego
  renderJuego = false;
  //datos a rellenar del jugador
  usuario = ""; //nombre de usuario
  private _listaAutos = ['Rojo','Blanco'];
  indexAuto = 0;
  idNuevaSala:any;



  constructor(private socketService:SocketService,
              private cookieService: CookieService,
              private router:Router){
    this.socketService.crearConexion();

    this.subscription.add(this.socketService.getIdSala().subscribe((data:any)=>{
      this.idNuevaSala = data;
    }));
    //crea la partida solo si es necesario;

  }


  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
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

  /** Usa cookies para obtener la informacion del componente anterior y crear la partida en el servidor o bien unirse a la partida**/
  crearPartida(){
    //revisa que no haya espacios vacios.
    if(this.usuario==""){
      Swal.fire({
        title: 'Error, espacios vacios.',
        text: 'Complete todos los espacios..',
        icon: 'error',
        timer: 4000,
        showConfirmButton: false,
      })
    }else{
      //Solo si es el creador de la partida. la crea sino se une a una existente.
      this.cookieService.set('usuario', this.usuario);
      if (this.cookieService.check('configuracion')){
        let jsonConfig:any = JSON.parse(this.cookieService.get('configuracion'));
        jsonConfig.nombre = this.usuario;
        jsonConfig.carro = this._listaAutos[this.indexAuto];
        this.cookieService.set('idPartida',this.idNuevaSala);
        this.subscription.add(this.socketService.crearSala(jsonConfig));
      }else{
        let data:any = {
          idPartida:this.cookieService.get('idPartida'),
          nombre:this.usuario,
          carro: this._listaAutos[this.indexAuto]
        }
        this.subscription.add(this.socketService.unirseSala(data))
      }
      this.renderJuego = true;

    }

  }


}
