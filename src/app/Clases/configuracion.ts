export class Configuracion {
  constructor (private _tipo:string, private _contratiempo:string, private _pista:string, private _vueltas:number, private _cantJugadores:number, private _tiempoSala: string){}

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
}
