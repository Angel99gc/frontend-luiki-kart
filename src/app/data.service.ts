import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  private _URL_SERVIDOR: string = environment.URL_SERVIDOR;

  GetListaJuegosFinalizados(){
    let headers = {};
    return this.httpClient.get(this._URL_SERVIDOR + 'ranking/getRanking',{headers})
  }
}
