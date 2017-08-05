import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ChatsPage } from '../pages/chats/chats';
import { ChatBubble} from '../components/chat-bubble/chat-bubble';
import { keyboardFix } from '../components/keyboard-fix/keyboard-fix'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ElasticModule } from 'angular2-elastic';
import { ChatDate } from '../pipes/chat-date';


@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    HelloIonicPage,
    ChatBubble,
    keyboardFix,
    ChatDate
    
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
    // MyApp,
    HelloIonicPage,
    // Home,
    // ChatBubble,
    ChatsPage
  ],
  providers: [ChatDate]
})
export class AppModule {}
