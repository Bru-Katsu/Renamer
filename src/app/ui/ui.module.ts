import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UiRoutingModule } from './ui.routing';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    NavigationComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule
  ]
})
export class UiModule { }
