export class Carrera {
  constructor (private _id:number, private _ganador:string, private _tiempo:string, private _pista:string, private _vueltas:number) {

  }

  get id(): number {
    return this._id;
  }

  get ganador(): string {
    return this._ganador;
  }

  get tiempo(): string {
    return this._tiempo;
  }

  get pista(): string {
    return this._pista;
  }

  get vueltas(): number {
    return this._vueltas;
  }
}
