import { Component, Injectable, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {





  title = 'socket-front-client';
  user:any;
  user_id:any;
  msg:any;
  input_message:any;
  show_message:any;
  messages=[];

  constructor(protected socketService: SocketService, private cookieService: CookieService) {
  }

  ngOnInit() {
    try{
      this.show_message = JSON.parse(this.cookieService.get('user'));
    }catch(e){
      this.show_message = null
    }

  }

  mockedUser = () => {
    this.cookieService.set('user',JSON.stringify({
      user:this.user ,
      id:this.user_id
    }))

    window.location.reload();
  }

  // sendData = (event: any) =>{
  //   this.socketService.(event,
  //     {
  //       message: this.input_message
  //     })
  //   this.input_message = null;
  // }
}
