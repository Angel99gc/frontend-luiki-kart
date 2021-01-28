import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router';
import { Rutas } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { SocketIoModule } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './socket.service';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { UnirsePartidaComponent } from './unirse-partida/unirse-partida.component';
import { NuevaPartidaComponent } from './nueva-partida/nueva-partida.component';
import { ModalRankingComponent } from './modal-ranking/modal-ranking.component';

import { DataService } from './data.service';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentComponent } from './document/document.component';
import { FormsModule } from '@angular/forms';
import { PruebaComponent } from './prueba/prueba.component';
import { JuegoCanvasComponent } from './juego-canvas/juego-canvas.component';
import { ModalEstadisticasComponent } from './modal-estadisticas/modal-estadisticas.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    UnirsePartidaComponent,
    NuevaPartidaComponent,
    ModalRankingComponent,
    DocumentListComponent,
    DocumentComponent,
    PruebaComponent,
    JuegoCanvasComponent,
    ModalEstadisticasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forRoot(Rutas),
    SocketIoModule,
    FormsModule
  ],
  providers: [DataService, SocketService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
