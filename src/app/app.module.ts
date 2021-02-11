import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import { Rutas } from './app-routing.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";



import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './socket.service';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { UnirsePartidaComponent } from './unirse-partida/unirse-partida.component';
import { NuevaPartidaComponent } from './nueva-partida/nueva-partida.component';
import { ModalRankingComponent } from './modal-ranking/modal-ranking.component';

import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { PruebaComponent } from './prueba/prueba.component';
import { JuegoCanvasComponent } from './juego-canvas/juego-canvas.component';
import { ModalEstadisticasComponent } from './modal-estadisticas/modal-estadisticas.component';
import { JuegoComponent } from './juego/juego.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    UnirsePartidaComponent,
    NuevaPartidaComponent,
    ModalRankingComponent,
    PruebaComponent,
    JuegoCanvasComponent,
    ModalEstadisticasComponent,
    JuegoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot(Rutas),
    FormsModule
  ],
  providers: [DataService, SocketService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
