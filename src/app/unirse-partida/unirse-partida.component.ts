import {Component, EventEmitter, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SocketService} from '../socket.service';
import {Partida} from '../Clases/partida';
import Swal from "sweetalert2";
import {Jugador} from '../Clases/jugador';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unirse-partida',
  templateUrl: './unirse-partida.component.html',
  styleUrls: ['./unirse-partida.component.css']
})
export class UnirsePartidaComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private _partidas:Partida[]= [];
  private _jugadores:Jugador[] = [];
  private _indexPartida:number = 0;

  constructor(private socketService:SocketService, private cookieService:CookieService, private router:Router ) {

  }

  ngOnInit(): void {
    this.socketService.crearConexion();
    this.subscription.add(this.socketService.getPartidas().subscribe((data:any)=>{
      console.log(data);
      this._partidas = [];
      this._jugadores = [];
      data.forEach( (partida:any) => {
        this._partidas.push(new Partida(partida.id, partida.estado, partida.tipo, partida.contratiempo, partida.pista, partida.vueltas, partida.cantJugadores, partida.tiempoSala,partida.jugadores))
      });
      if(this.partidas.length==0){
        Swal.fire({
          title: 'No hay partidas creadas.',
          text: 'Sé el primero en crea una Nueva Partida.',
          icon: 'info',
          timer: 4000,
          showConfirmButton: false,
        }).then( () =>{
          this.router.navigate(['inicio']);
        })
      }else{
        this._jugadores = this._partidas[this._indexPartida].listaJugadores;
      }

    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  get jugadores(): Jugador[] {
    return this._jugadores;
  }

  get partidas(): Partida[] {
    return this._partidas;
  }


  get indexPartida(): number {
    return this._indexPartida;
  }
  updateListaJugadores(index:number){
    this._indexPartida = index;
    this._jugadores = this._partidas[this._indexPartida].listaJugadores;
  }
  unirsePartida(){
    this.cookieService.delete('configuracion');
    this.cookieService.set('idPartida',this._partidas[this._indexPartida].id.toString());
    this.router.navigate(['juego']);
    console.log("me uní!")
  }
}
