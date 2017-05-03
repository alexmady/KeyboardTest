import { Component, ViewChild, NgZone } from '@angular/core';
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
  private millis = 100;
  private textareaHeight;
  private isTextareaFocused = false;
  private noHideAdjust = false;
  private scrollContentElelment: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private user;
  private keyboardHideSub;
  private keybaordShowSub;
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



  constructor(keybaord: Keyboard, public plt: Platform, private ngZone: NgZone, public navParams: NavParams, public navCtrl: NavController) {

    this.user = navParams.get('user');

  }

  footerTouchStart(event) {
    if (event.target.localName !== "textarea") {
      event.preventDefault();
    }
  }

  ionInputTouchStart(evt) {
    if (this.isTextareaFocused) {
      evt.preventDefault();
    }
  }


  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;
      this.scrollContentElelment.style.marginBottom = newNumber + 'px';
      this.updateScroll('textAreaChange');
    }
  }

  back($event: Event) {
    $event.preventDefault();
    this.keyboardHideSub.unsubscribe();
    this.keybaordShowSub.unsubscribe();
    this.inputElement.onblur = null;
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

    this.keyboardHideSub = Keyboard.onKeyboardHide().subscribe(() => {

      console.log('keybaordHide');
      if (!this.noHideAdjust) {
        let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
        let newHeightStr = newHeight + 'px';
        this.scrollContentElelment.style.marginBottom = newHeightStr;
        this.footerElement.style.marginBottom = '0px';
        this.updateScroll('keybaordHide');
      }

    });

    this.keybaordShowSub = Keyboard.onKeyboardShow().subscribe((e) => {

      this.noHideAdjust = false;
      console.log('keybaordShow');
      let newHeight = (e['keyboardHeight'] + 44) + this.textareaHeight - this.initialTextAreaHeight;
      this.scrollContentElelment.style.marginBottom = newHeight + 'px';
      this.footerElement.style.marginBottom = e['keyboardHeight'] + 'px';

      setTimeout(() => {
        this.updateScroll('keybaordShow');
      }, 100)

    });

    let page: any = document.getElementsByTagName('hello-ionic-page');
    this.scrollContentElelment = page[0].children[1].children[1];
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

    if (this.plt.is('core') || this.plt.is('mobileweb')) {
      this.updateScroll('sendMessage');
      this.scrollContentElelment.style.marginBottom = '44px';
    }

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
    }, 100);
  }
}
