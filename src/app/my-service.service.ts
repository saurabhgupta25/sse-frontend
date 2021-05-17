import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs'

import { SseServiceService } from './sse-service.service';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private _zone: NgZone, private _sseService: SseServiceService) { }

  eventSource;

  getServerSentEvents(url: string) {
    return new Observable(observer => {
      this.eventSource = this._sseService.getEventSource(url);

      this.eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };

      this.eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  closeSse() {
    this.eventSource.close();
  }
}
