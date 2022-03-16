import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { ComponentLoader } from './component-loader';

@NgModule({
  declarations: [AppComponent, ComponentLoader],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot([])],
  bootstrap: [AppComponent],
})
export class AppModule {}
