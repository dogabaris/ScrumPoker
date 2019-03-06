import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConnectionResolver } from '../helpers/signalResolver';

@Component({
  selector: 'app-addstorylist',
  templateUrl: './addstorylist.component.html',
})
export class AddStoryListComponent {
  sessionName = '';
  numberVoters = 0;
  storyList = '';
  storyArray: String[];
  constructor(private toastr: ToastrService, private router: Router, private connectionResolver: ConnectionResolver) { }

  checkConventions() {
    if (this.sessionName.length > 200) {
      this.showError("Session name cannot exceed 200 characters!");
      //console.warn("Session name cannot exceed 200 characters!");
      return false;
    }
    if (!this.sessionName) {
      this.showError("Session name cannot be null or empty!");
      //console.warn("Session name cannot be null or empty!");
      return false;
    }
    if (this.numberVoters <= 0) {
      this.showError("Number of voters cannot be under 0 or equal 0!");
      //console.warn("Number of voters cannot be under 0 or equal 0!");
      return false;
    }
    if (!this.numberVoters) {
      this.showError("Number of voters cannot be null or empty!");
      //console.warn("Number of voters cannot be null or empty!");
      return false;
    }
    return true;
  }

  showError(error) {
    this.toastr.error(error,
      'Error',
      {
        timeOut: 3000
      });
  }

  startSessions() {
    if (this.checkConventions()) {
      this.storyArray = this.storyList.split(new RegExp('[,;\n]', 'g'));
      //let elements = rawElements.map(element => element.trim());
      //console.log(this.storyArray);
      this.connectionResolver.getSignalR().then((c) => {
        c.invoke('CreateSession', this.sessionName, this.numberVoters, this.storyArray).then(() => {

        });
      });
      this.router.navigateByUrl('/poker-planning-view-as-scrummaster/'+this.sessionName);
    }
      
  }
}
