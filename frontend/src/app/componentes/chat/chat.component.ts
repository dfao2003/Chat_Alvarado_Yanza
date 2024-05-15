import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../servicios/chat.service';

@Component({
  selector: '',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  public message: string = '';
  public messages: any = [];

  ngOnInit(): void {
    this.listenMessages();
  }

  constructor(private chatService: ChatService){}

  public sendMessage(){
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message = '';
  }

  public listenMessages(){
    this.chatService.listenMessages().subscribe((data: any) =>{
      console.log(data);
      this.messages.push(data.data);
    })
  }

}
