import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Home } from './home';

@NgModule({
  declarations: [
    Home,
  ],
  imports: [
    IonicModule.forRoot(Home),
  ],
  exports: [
    Home
  ]
})
export class HomeModule {}
