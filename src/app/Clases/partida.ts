import {Jugador} from './jugador';

export class Partida {
  private _listaJugadores: Jugador[];

  constructor(private _id: string, private _estado:string, private _tipo: string, private _contratiempo: string, private _pista: string, private _vueltas: number, private _cantJugadores: number, private _tiempoSala: string) {
    this._listaJugadores = [];
  }


  get id(): string {
    return this._id;
  }

  get listaJugadores(): Jugador[] {
    return this._listaJugadores;
  }

  get tipo(): string {
    return this._tipo;
  }

  get contratiempo(): string {
    return this._contratiempo;
  }

  get pista(): string {
    return this._pista;
  }

  get vueltas(): number {
    return this._vueltas;
  }

  get cantJugadores(): number {
    return this._cantJugadores;
  }

  get tiempoSala(): string {
    return this._tiempoSala;
  }

  addJugador(nombre:string, carro:string){
    this._listaJugadores.push(new Jugador(nombre, carro));
  }

}
