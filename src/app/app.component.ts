import { Component } from '@angular/core';
import {Service3Service} from "./services/service3.service";
import {Service4Service} from "./services/service4.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(
    public service3: Service3Service,
    public service4: Service4Service
  ) {
  }

}
