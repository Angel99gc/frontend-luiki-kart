import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SocketService} from '../socket.service';
import {Partida} from '../Clases/partida';
import Swal from "sweetalert2";
import {Jugador} from '../Clases/jugador';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unirse-partida',
  templateUrl: './unirse-partida.component.html',
  styleUrls: ['./unirse-partida.component.css']
})
export class UnirsePartidaComponent implements OnInit {
  private _partidas:Partida[] = [];
  private _jugadores:Jugador[] = [new Jugador('Angel', 'rojo'), new Jugador('DARIUSGAMER', 'rojo')];
  private _id:Number = 0;

  constructor(private socketService:SocketService, private cookieService:CookieService, private router:Router ) {

    socketService.crearConexion();
    socketService.socket.on('getPartidasEspera', (response:any) => {
      this._partidas = [];
      response.forEach( (data:any) => {
        this._partidas.push(new Partida(data.id, data.estado, data.tipo, data.contratiempo, data.pista, data.vueltas, data.cantJugadores, data.tiempoSala))
      });
      if(this.partidas.length==0){
        Swal.fire({
          title: 'No hay partidas creadas.',
          text: 'Inténte de nuevo más tarde.',
          icon: 'info',
          timer: 4000,
          showConfirmButton: false,
        }).then( () =>{
          this.router.navigate(['inicio'])

        })
      }
    });
  }




  ngOnInit(): void {

  }




  get id(): Number {
    return this._id;
  }

  get jugadores(): Jugador[] {
    return this._jugadores;
  }

  get partidas(): Partida[] {
    return this._partidas;
  }

  setID(id:string){
    this._id= Number(id);
  }

  unirsePartida(){
    this.cookieService.delete('configuracion');
    this.router.navigate(['juego']);
    console.log("me uní!")
  }
}
