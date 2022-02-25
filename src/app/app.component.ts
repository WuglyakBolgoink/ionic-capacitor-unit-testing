import {
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  App,
  URLOpenListenerEvent,
} from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'x2';

  private destroy$ = new Subject<void>();

  constructor(private readonly zone: NgZone) {
  }

  ngOnInit(): void {
    this.initializeGlobalListenersForMobileApp();
  }

  ngOnDestroy(): void {
    if (Capacitor.isNativePlatform()) {
      App.removeAllListeners();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeGlobalListenersForMobileApp(): void {
    if (Capacitor.isNativePlatform()) {
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
          if (event.url.includes('myapp://auth')) {
            Browser.close();
            Browser.removeAllListeners();
            // todo: do something
          }
        });
      });
    }
  }
}
