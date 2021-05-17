import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.css']
})
export class SseComponent implements OnInit, OnDestroy {

  constructor(private _myService: MyServiceService) { }

  ngOnInit() {
    this._myService.getServerSentEvents(`http://localhost:3000/sse`).subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this._myService.closeSse();
  }

}
