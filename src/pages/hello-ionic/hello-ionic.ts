import { Component, ViewChild, NgZone } from '@angular/core';
import { Content } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'hello-ionic-page',
  templateUrl: 'hello-ionic.html',
  providers: [Keyboard]
})
export class HelloIonicPage {

  private inputElement;
  private millis = 100;
  private textareaHeight;
  private isTextareaFocused = true;
  private noHideAdjust = false;
  private scrollContentElelment: any;
  private footerElement: any;
  private initialTextAreaHeight;

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

  constructor(keybaord: Keyboard, private ngZone: NgZone) {

    Keyboard.onKeyboardHide().subscribe(() => {

      console.log('keybaordHide');
      if (!this.noHideAdjust) {
        let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
        let newHeightStr = newHeight + 'px';
        console.log(newHeightStr, this.initialTextAreaHeight, this.textareaHeight);
        this.scrollContentElelment.style.marginBottom = newHeightStr;
        this.footerElement.style.marginBottom = '0px';
      }
      this.updateScroll();

    });

    Keyboard.onKeyboardShow().subscribe((e) => {

      this.noHideAdjust = false;
      console.log('keybaordShow');
      let newHeight = (e['keyboardHeight'] + 44) + this.textareaHeight - this.initialTextAreaHeight;
      this.scrollContentElelment.style.marginBottom = newHeight + 'px';
      this.footerElement.style.marginBottom = e['keyboardHeight'] + 'px';

      setTimeout(() => {
        this.updateScroll();
      }, 100)

    });

  } // end constructor

  footerTouchStart(event) {
    if (event.target.localname !== "textarea") {
      event.preventDefault();
    }
  }

  ionInputTouchStart(evt: Event) {
    if (this.isTextareaFocused) {
      evt.preventDefault();
    }
  }


  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    //console.log('new height VS textareaHeight', newHeight, this.textareaHeight);

    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;
      this.scrollContentElelment.style.marginBottom = newNumber + 'px';
      this.updateScroll();
    }

  }



  ionViewDidLoad() {

    this.scrollContentElelment = document.getElementsByClassName('scroll-content')[1];
    this.footerElement = document.getElementsByClassName('footer')[0];
    this.inputElement = document.getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    // let sc: any = document.getElementsByClassName('scroll-content')[1];
    // sc.style.cssText = sc.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
    //   this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;

    this.inputElement.onfocus = (evt: Event) => {
      this.inputElement.onblur = (event: Event) => {
        event.preventDefault();
        this.inputElement.focus();
      };
    }
  }

  contentMouseDown(event) {

    this.isTextareaFocused = false;
    if (this.inputElement.onblur) {
      this.inputElement.onblur = null;
    }
  }

  touchSendButton(event: Event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.noHideAdjust = true;
    this.sendMessage();
  }

  sendMessage() {

    this.messages.push({
      position: 'left',
      body: this.message
    });
    
    this.message = "";
    this.textareaHeight = this.initialTextAreaHeight;

    if (!this.inputElement.onblur) {
      this.updateScroll();
    }

    setTimeout(() => {
      this.messages.push({
        position: 'right',
        body: "random reply to your amazing message is here"
      });
      this.updateScroll();
    }, 3000)
  }



  updateScroll() {
    setTimeout(() => {
      //console.log('updating scroll')
      this.content.scrollToBottom();
    }, 100);
  }
}
