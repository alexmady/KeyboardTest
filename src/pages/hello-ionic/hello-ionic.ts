import { Component, ViewChild, Renderer } from '@angular/core';
import { Content, NavParams, NavController, Platform } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'hello-ionic-page',
  templateUrl: 'hello-ionic.html',
  providers: [Keyboard]
})
export class HelloIonicPage {

  @ViewChild(Content) content: Content;
  private inputElement;
  private millis = 200;
  private scrollTimeout = this.millis + 50;
  private textareaHeight;
  private scrollContentElelment: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private user;
  private keyboardHideSub;
  private keybaordShowSub;
  private message = "";

  constructor(keybaord: Keyboard, public platform: Platform, public renderer: Renderer, public navParams: NavParams, public navCtrl: NavController) {

    this.user = navParams.get('user');

  }

  footerTouchStart(event) {
    //console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
      // console.log('preventing')
    }
  }

  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }

  back(event: Event) {

    this.inputElement.blur();
    this.navCtrl.pop().then(() => {
      if (this.platform.is('ios')) {
        this.removeKeyboardListeners();
      }
    });
  }

  removeKeyboardListeners() {
    this.keyboardHideSub.unsubscribe();
    this.keybaordShowSub.unsubscribe();
  }

  addKeyboardListeners() {

    this.keyboardHideSub = Keyboard.onKeyboardHide().subscribe(() => {
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
      let marginBottom = newHeight + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = Keyboard.onKeyboardShow().subscribe((e) => {

      let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
      let marginBottom = newHeight + 44 + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
      this.updateScroll('keybaord show', this.scrollTimeout);
    });
  }

  ionViewDidLoad() {

    if (this.platform.is('ios')) {
      this.addKeyboardListeners()
    }

    this.scrollContentElelment = this.content.getScrollElement();

    this.footerElement = document.getElementsByTagName('hello-ionic-page')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('hello-ionic-page')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElelment.style.cssText = this.scrollContentElelment.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;

    this.updateScroll('load', 500)

  }

  contentMouseDown(event) {
    //console.log('blurring input element :- > event type:', event.type);
    this.inputElement.blur();
  }

  touchSendButton(event: Event) {
    //console.log('touchSendButton, event type:', event.type);
    event.preventDefault();
    this.sendMessage();
  }

  sendMessage() {

    this.messages.push({
      position: 'left',
      body: this.message,
      timestamp: new Date()
    });

    this.message = "";

    let currentHeight = this.scrollContentElelment.style.marginBottom.replace('px', '');
    let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
    let top = newHeight + 'px';
    this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', top);
    this.updateScroll('sendMessage', this.scrollTimeout);
    this.textareaHeight = this.initialTextAreaHeight;

    //DUMMY response message
    setTimeout(() => {
      this.messages.push({
        position: 'right',
        body: "random reply to your amazing message is here",
        timestamp: new Date()
      });
      this.updateScroll('reply message', this.scrollTimeout);
    }, 3000);

  }



  updateScroll(from, timeout) {
    setTimeout(() => {
      //console.log('updating scroll -->', from)
      this.content.scrollToBottom();
    }, timeout);
  }

  public messages: any[] = [
    {
      position: 'left',
      body: 'aaa',
      timestamp: new Date(),
    },
    {
      position: 'right',
      body: 'bbb',
      timestamp: new Date(),
    },
    {
      position: 'left',
      body: 'ccc',
      timestamp: new Date(),
    },
    {
      position: 'right',
      body: 'ddd',
      timestamp: new Date(),
    },
    {
      position: 'left',
      body: 'eee',
      timestamp: new Date(),

    },
    {
      position: 'right',
      body: 'fff',
      timestamp: new Date(),

    },
    {
      position: 'right',
      body: 'fff',
      timestamp: new Date(),

    },
    {
      position: 'right',
      body: 'fff',
      timestamp: new Date(),

    },
    {
      position: 'right',
      body: 'fff',
      timestamp: new Date(),
    }
  ];

}
