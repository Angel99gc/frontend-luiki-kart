import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import { Rutas } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { UnirsePartidaComponent } from './unirse-partida/unirse-partida.component';
import { NuevaPartidaComponent } from './nueva-partida/nueva-partida.component';
import { ModalRankingComponent } from './modal-ranking/modal-ranking.component';

import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    UnirsePartidaComponent,
    NuevaPartidaComponent,
    ModalRankingComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot(Rutas)

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
