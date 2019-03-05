import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStoryListComponent } from './addstorylist/addstorylist.component';
import { ViewAsScrumMasterComponent } from './scrummaster/viewasscrummaster.component';
import { ViewAsDeveloperComponent } from './developer/viewasdeveloper.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'poker-planning-add-story-list',
    component: AddStoryListComponent
  },
  {
    path: 'poker-planning-view-as-scrummaster',
    component: ErrorComponent
  },
  {
    path: 'poker-planning-view-as-developer',
    component: ErrorComponent
  },
  {
    path: 'poker-planning-view-as-scrummaster/:sessionName',
    component: ViewAsScrumMasterComponent
  },
  {
    path: 'poker-planning-view-as-developer/:sessionName',
    component: ViewAsDeveloperComponent
  },
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
