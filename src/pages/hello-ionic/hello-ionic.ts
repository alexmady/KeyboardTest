import { Component, ViewChild, NgZone } from '@angular/core';
import { Config } from 'ionic-angular'
import { Content } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'hello-ionic-page',
  templateUrl: 'hello-ionic.html',
  providers: [Keyboard]
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

  //  private inputBlurring;
  //private config: Config;

  constructor(config: Config, keybaord: Keyboard, private ngZone: NgZone) {

    // this.config = config;
    // this.inputBlurring = this.config.get('platforms').ios.inputBlurring;
    // console.log('CONFIG', config.get('platforms'));

    Keyboard.onKeyboardHide().subscribe(() => {

      if (!this.noHideAdjust) {
        console.log('keybaordHide');
        let sc: any = document.getElementsByClassName('scroll-content')[1];
        sc.style.marginBottom = '44px';
        let footer: any = document.getElementsByClassName('footer')[0];
        footer.style.marginBottom = '0px';
      }
      this.updateScroll();

    });

    Keyboard.onKeyboardShow().subscribe((e) => {

      this.noHideAdjust = false;
      console.log('keybaordShow');
      let scrollContent = (<HTMLDivElement>document.querySelector('.scroll-content'));
      console.log('SC:', scrollContent, scrollContent.style)
      let newHeight = (e['keyboardHeight'] + 44);
      console.log('new height', newHeight);
      let sc: any = document.getElementsByClassName('scroll-content')[1];
      sc.style.marginBottom = newHeight + 'px';

      let footer: any = document.getElementsByClassName('footer')[0];
      footer.style.marginBottom = newHeight - 44 + 'px';
      this.updateScroll();


    });


  }

  // toggleInputBlurring(val) {
  //   console.log('set inputBlurring', val)
  //   this.config.set('ios', 'inputBlurring', val);
  //   this.inputBlurring = this.config.get('platforms').ios.inputBlurring;

  // }

  private inputElement;

  private onblurAdded = false;

  private isFocused = false;


  ionInputTouchStart(evt: Event) {
    if (this.isFocused) {
      console.log(' ***** preventing secondary focus');
      evt.preventDefault();
      evt.stopImmediatePropagation();
      evt.stopPropagation();
    } else {
      console.log('was not focused ****** ');
    }
  }

  ionViewDidLoad() {
    this.inputElement = document.getElementsByTagName('input')[0];
    console.log(this.inputElement, '<<-- input element')

    // this.inputElement.touchstart = (evt: Event) => {
    //   if (this.isFocused) {
    //     console.log('preventing secondary focus');
    //     evt.preventDefault();
    //   }
    // }


    this.inputElement.onfocus = (evt: Event) => {

      this.isFocused = true;
      console.log('setting focused true');
      
      this.inputElement.onblur = (event: Event) => {

        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.inputElement.focus();

      };

    }

  }





  contentMouseDown(event) {

    this.isFocused = false;
    if (this.inputElement.onblur) {
      console.log('REMOVING BLUR EVENT');
      this.inputElement.onblur = null;
      this.onblurAdded = false;
      this.updateScroll();
    }

  }

  private noHideAdjust = false;

  toolbarTouchStart(event: Event) {
    console.log('toolbar touch start prevent');
    event.preventDefault();
  }

  buttonMouseDown(event: Event) {

    event.preventDefault();
    console.log('button mouse down');

    //setTimeout(() => {
    this.noHideAdjust = true;
    this.sendMessage();
    //}, 0)

    event.stopImmediatePropagation();
    event.stopPropagation();
    //this.inputElement.focus();


  }

  sendMessage() {
    this.messages.push({
      position: 'left',
      body: this.message
    });
    this.message = "";

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
      console.log('updating scroll')
      this.content.scrollToBottom();
    }, 100);
  }
}
