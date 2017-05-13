import {Component} from '@angular/core';
@Component({
    selector: 'chat-bubble',
    inputs: ['msg: message'],
    template:
    `
      <div class="chatBubble">
        <!-- <div class="profile-pic {{msg.position}}"></div> -->
        <div *ngIf="msg.body" class="chat-bubble {{msg.position}}">
          <div class="message">{{msg.body}}</div>
          <div class="message-detail">
              <span>{{msg.timestamp| date: "HH:mm"}}</span>
          </div>
        </div>
         <div *ngIf="msg.img" class="chat-bubble-img {{msg.position}}">
          <img src="{{msg.img}}">
          <div class="message-detail-img">
              <span>{{msg.timestamp| date: "HH:mm"}}</span>
          </div>
        </div>
      </div>
  `
})
export class ChatBubble {
    public msg: any;
    constructor() {
        this.msg = {
            content: 'Am I dreaming?',
            position: 'left',
            time: '12/3/2016',
            senderName: 'Gregory'
        }
    }
}
