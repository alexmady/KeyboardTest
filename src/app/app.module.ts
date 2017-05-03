import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import {ChatBubble} from '../components/chat-bubble/chat-bubble';
import { keyboardFix } from '../components/keyboard-fix/keyboard-fix'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ElasticModule } from 'angular2-elastic';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ChatBubble,
    keyboardFix
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ElasticModule,
    IonicModule.forRoot(MyApp, {
        ios: {
          scrollAssist: false, 
          autoFocusAssist: false,
          inputBlurring: false
        }
    }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ChatBubble
  ],
  providers: []
})
export class AppModule {}
