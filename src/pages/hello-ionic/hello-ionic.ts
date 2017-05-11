import { Component, ViewChild, Renderer } from '@angular/core';
import { Content, NavParams, NavController } from 'ionic-angular';
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
  private textareaHeight;
  private scrollContentElelment: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private user;
  private keyboardHideSub;
  private keybaordShowSub;

  private fakeBGVisible = true;

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
    {
      position: 'right',
      body: 'fff'
    },
    {
      position: 'right',
      body: 'fff'
    },
    {
      position: 'right',
      body: 'fff'
    }
  ];



  constructor(keybaord: Keyboard, public renderer: Renderer, public navParams: NavParams, public navCtrl: NavController) {

    this.user = navParams.get('user');

  }

  footerTouchStart(event) {
    console.log('footerTouchStart: ', event.type, event.target.localName, '...')

    if (event.target.localName !== "textarea") {
      event.preventDefault();
      console.log('preventing')
    }
  }

  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      console.log('new text area height', this.textareaHeight);
      let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;
      
      let top = newNumber + 'px';
      console.log('textAreaChange', 'setting top to', top);
      //this.scrollContentElelment.style.marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', top );
      // this.content.resize();
      // if (this.contentBottom()) {
      this.updateScroll('textAreaChange');
      // }
    }
  }

  back(event: Event) {

    this.fakeBGVisible = false;

    this.inputElement.blur();
    this.navCtrl.pop().then(() => {
      this.keyboardHideSub.unsubscribe();
      this.keybaordShowSub.unsubscribe();
    });
  }

  ionScrollEnd(){
    console.log('reaced ion scroll end, about to hide Keyboard');
  }

  ionViewDidLoad() {

    this.keyboardHideSub = Keyboard.onKeyboardHide().subscribe(() => {

      console.log('keyboard Hide');
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
      let top = newHeight + 'px';

      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', top);
      console.log('setting top to 0px')
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = Keyboard.onKeyboardShow().subscribe((e) => {

      console.log('keyboard Show');
      let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
      let top =  newHeight + 44 + 'px';
      this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom',top );
      console.log('top', top);

      this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
      this.updateScroll('keybaord show');
    });

    this.scrollContentElelment = this.content.getScrollElement();

    console.log('scroll element', this.scrollContentElelment)


    this.footerElement = document.getElementsByTagName('hello-ionic-page')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('hello-ionic-page')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElelment.style.cssText = this.scrollContentElelment.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;

    this.updateScroll('load')

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
      body: this.message
    });

    this.message = "";

    let currentHeight = this.scrollContentElelment.style.marginBottom.replace('px', '');
    let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
    let top =  newHeight + 'px';
    this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', top);
    console.log('send message, top', top)
    this.updateScroll('sendMessage');
    this.textareaHeight = this.initialTextAreaHeight;

    //DUMMY response message
    setTimeout(() => {
      this.messages.push({
        position: 'right',
        body: "random reply to your amazing message is here"
      });
      this.updateScroll('reply message');
    }, 3000)
  }



  updateScroll(from) {
    setTimeout(() => {
      console.log('updating scroll -->', from)
      this.content.scrollToBottom();
    }, 300);
  }
}
