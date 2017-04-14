import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Keyboard, StatusBar } from 'ionic-native';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      //Keyboard.disableScroll(true);

    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}
