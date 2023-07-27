import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
//modulo del core, que tiene los menus
@NgModule({
  declarations: [MainMenuComponent, FooterComponent, LeftMenuComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule, NzAvatarModule],
  exports: [
    MainMenuComponent,
    FooterComponent,
    LeftMenuComponent,
  ],
})
export class CoreModule {}
