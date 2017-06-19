import { Component, OnInit } from '@angular/core';
import { ApiService, WaffleDispatcherService, MeActionService, MeStoreService } from "app/common/services";

@Component({
  selector: 'wf-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private waffleDispatcherService: WaffleDispatcherService,
    private meActionService: MeActionService,
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
  }

}
