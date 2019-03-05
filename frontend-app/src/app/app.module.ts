import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStoryListComponent } from './addstorylist/addstorylist.component';
import { ViewAsScrumMasterComponent } from './scrummaster/viewasscrummaster.component';
import { ViewAsDeveloperComponent } from './developer/viewasdeveloper.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddStoryListComponent,
    ViewAsScrumMasterComponent,
    ViewAsDeveloperComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
