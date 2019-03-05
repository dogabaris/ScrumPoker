import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewasdeveloper',
  templateUrl: './viewasdeveloper.component.html',
})
export class ViewAsDeveloperComponent {
  constructor(private toastr: ToastrService) { }
}
