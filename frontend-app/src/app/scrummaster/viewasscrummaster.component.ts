import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewasscrummaster',
  templateUrl: './viewasscrummaster.component.html',
})
export class ViewAsScrumMasterComponent {
  constructor(private toastr: ToastrService) { }
}
