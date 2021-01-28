import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  renderModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  rendererModal(event: any){
    this.renderModal = event;
  }
  verRanking(){
    this.renderModal = true;
  }
}
