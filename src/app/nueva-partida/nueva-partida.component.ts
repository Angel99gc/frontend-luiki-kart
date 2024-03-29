import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-nueva-partida',
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.css']
})
export class NuevaPartidaComponent implements OnInit {

  lista:any;
  private _listaTipos = ['Carrera', 'ContraTiempo'];
  indexTipo = 0;
  private _listaContratiempos = ['30seg', '1min','1:30', '2min', '2:30', '3min', '3:30'];
  private _listaContratiemposMs = [30000, 60000, 90000, 120000, 150000, 180000, 210000]
  indexContratiempo = 0;
  private _listaPistas = ['Bosque', 'Desierto', 'Lava' ];
  indexPista = 0;
  private _vueltas:number = 1
  private _cantJugadores:number = 2
  private _listaTiempoEspera = ['30seg', '1min', '1:30', '2min', '2:30', '3min', '3:30'];
  private _listaTiempoEsperaMs = [30000, 60000, 90000, 120000, 150000, 180000, 210000]

  indexTiempoEspera = 0;

  constructor(private spinner: NgxSpinnerService,  private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {
  }
  get vueltas(): number {
    return this._vueltas;
  }
  get cantJugadores(): number {
    return this._cantJugadores;
  }

  getTipo(){
    return this._listaTipos[this.indexTipo];
  }
  getContratiempo(){
    return this._listaContratiempos[this.indexContratiempo];
  }
  getPista(){
    return this._listaPistas[this.indexPista];
  }
  getTiempoEspera(){
    return this._listaTiempoEspera[this.indexTiempoEspera];
  }
  editIndexTipo(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this.indexTipo!=0) return this.indexTipo--;
      else return this.indexTipo=this._listaTipos.length-1

    }else{
      if (this.indexTipo+1 != this._listaTipos.length) return this.indexTipo++;
      else return this.indexTipo=0;
    }
  }
  editIndexContratiempo(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this.indexContratiempo!=0) return this.indexContratiempo--;
      else return this.indexContratiempo=this._listaContratiempos.length-1
    }else{
      if (this.indexContratiempo+1 != this._listaContratiempos.length) return this.indexContratiempo++;
      else return this.indexContratiempo=0;
    }
  }
  editIndexPista(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this.indexPista!=0) return this.indexPista--;
      else return this.indexPista=this._listaPistas.length-1

    }else{
      if (this.indexPista+1 != this._listaPistas.length) return this.indexPista++;
      else return this.indexPista=0;
    }
  }
  editVueltas(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this._vueltas!=1) return this._vueltas--;
    }else{
      this._vueltas++;
    }
    return;
  }
  editCantJugadores(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this._cantJugadores!=2) return this._cantJugadores--;
    }else{
      this._cantJugadores++;
    }
    return;
  }
  editTiempoEspera(tipoBoton:string){
    if(tipoBoton=='-'){
      if (this.indexTiempoEspera!=0) return this.indexTiempoEspera--;
      else return this.indexTiempoEspera=this._listaTiempoEspera.length-1
    }else{
      if (this.indexTiempoEspera+1 != this._listaTiempoEspera.length) return this.indexTiempoEspera++;
      else return this.indexTiempoEspera=0;
    }
  }
  crearPartida(){
    this.spinner.show();
    let data:any = {
      tipo: this._listaTipos[this.indexTipo],
      contratiempo: this._listaContratiemposMs[this.indexContratiempo],
      pista: this._listaPistas[this.indexPista],
      vueltas: this.vueltas,
      cantJugadores: this.cantJugadores,
      tiempoSala: this._listaTiempoEsperaMs[this.indexTiempoEspera]
    }
    this.cookieService.set('configuracion', JSON.stringify(data));
    this.cookieService.delete('idPartida');
    this.router.navigate(['/juego']);
    this.spinner.hide();
  }

}
