export class Jugador{
  private _tiempo:string;
  constructor (private _nombre:string, private _carro:string) {
    this._tiempo = "0";
  }
  get nombre(): string {
    return this._nombre;
  }
  get carro(): string {
    return this._carro;
  }
  get tiempo(): string {
    return this._tiempo;
  }
  set tiempo(value: string) {
    this._tiempo = value;
  }
}
