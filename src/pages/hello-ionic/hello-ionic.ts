import { Component, ViewChild } from '@angular/core';
import { Content, TextInput } from 'ionic-angular';
@Component({
  selector: 'hello-ionic-page',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  public message = "";
  public messages: any[] = [
      {
        position: 'left',
        body: 'aaa'
      },
      {
        position: 'right',
        body: 'bbb'
      },
      {
        position: 'left',
        body: 'ccc'
      },
      {
        position: 'right',
        body: 'ddd'
      },
      {
        position: 'left',
        body: 'eee'
      },
      {
        position: 'right',
        body: 'fff'
      },
    ];
  @ViewChild(Content) content: Content;
  //@ViewChild('chat_input') messageInput: TextInput;
  constructor() {}
  sendMessage() {
    this.messages.push({
      position: 'left',
      body: "test"
    });
    this.message = "";
    console.log('calling updated');
    //this.messageInput.setFocus();
    this.updateScroll();
  }
  updateScroll() {
    console.log('updating scroll')
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100)
  }
}
