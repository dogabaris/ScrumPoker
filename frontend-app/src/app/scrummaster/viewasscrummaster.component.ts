import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-viewasscrummaster',
  templateUrl: './viewasscrummaster.component.html',
})
export class ViewAsScrumMasterComponent implements OnInit {
  baseUrl;
  sessionName;
  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    //this.sessionName = this.route.snapshot.params.sessionName;
    this.route.params.subscribe(paramsId => {
      this.sessionName = paramsId.sessionName;
      this.baseUrl = window.location.origin;
    });
    console.log("sessionName: ", this.sessionName);
  }
}
