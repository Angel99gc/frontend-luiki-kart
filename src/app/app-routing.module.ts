import { Routes} from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NuevaPartidaComponent } from './nueva-partida/nueva-partida.component';
import { UnirsePartidaComponent } from './unirse-partida/unirse-partida.component';
import { ModalRankingComponent } from './modal-ranking/modal-ranking.component';
import {JuegoCanvasComponent} from './juego-canvas/juego-canvas.component';


export const Rutas: Routes  = [

  {
    path: 'inicio', component: InicioComponent,  pathMatch: 'prefix'
  },
  {
    path: 'nuevaPartida', component: NuevaPartidaComponent,  pathMatch: 'full'
  },
  {
    path: 'unirsePartida', component: UnirsePartidaComponent,  pathMatch: 'full'
  },
  {
    path: 'ranking', component: ModalRankingComponent,  pathMatch: 'full'
  },
  {
    path: 'juego', component: JuegoCanvasComponent,  pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'inicio'
  }

];


