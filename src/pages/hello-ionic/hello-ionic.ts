import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

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

  constructor() {

  }

  private inputElement;

  ionViewDidLoad() {
    this.inputElement = document.getElementsByTagName('input')[0];
    console.log(this.inputElement, '<<-- input element')

    this.inputElement.onfocus = () => {
      console.log('input element focus');

      this.inputElement.onblur = (event) => {

        console.log(event.type, typeof (event));
        if (event.type === typeof (FocusEvent)) {

        } else {
          console.log('the event', event);
          console.log('on blur input');
          this.inputElement.focus();
        }
      }
    }
  }

  contentMouseDown() {
    console.log('content mouse down');
    this.inputElement.onblur = null;
  }

  sendMessage() {


    this.messages.push({
      position: 'left',
      body: this.message
    });
    this.message = "";
    console.log('calling updated');
    //this.messageInput.setFocus();
    //this.updateScroll();
  }

  
  updateScroll() {
    console.log('updating scroll')
    setTimeout(() => {
      this.content.scrollToBottom();
    },100)
  }
}
