import {
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import {
  App,
  AppState,
  BackButtonListenerEvent,
  RestoredListenerEvent,
  URLOpenListener,
  URLOpenListenerEvent,
} from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'x2'`, () => {
    expect(component.title).toEqual('x2');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('x2 app is running!');
  });

  describe('test ngOnDestroy', () => {
    beforeEach(fakeAsync(() => {
      spyOn(App, 'removeAllListeners');

      (App.removeAllListeners as any).and.returnValue(Promise.resolve());

      fixture.detectChanges();
      fixture.whenStable();
    }));

    it('should call App.removeAllListeners on mobile app', fakeAsync(() => {
      spyOn(Capacitor, 'isNativePlatform').and.returnValue(true);

      component.ngOnDestroy();

      fixture.detectChanges();
      fixture.whenStable();

      expect(Capacitor.isNativePlatform()).toBeTrue();

      expect(App.removeAllListeners).toHaveBeenCalled();
      expect(App.removeAllListeners).toHaveBeenCalledTimes(1);
    }));

    it('should not call App.removeAllListeners on web app', fakeAsync(() => {
      spyOn(Capacitor, 'isNativePlatform').and.returnValue(false);

      component.ngOnDestroy();

      fixture.detectChanges();
      fixture.whenStable();

      expect(Capacitor.isNativePlatform()).toBeFalse();
      expect(App.removeAllListeners).not.toHaveBeenCalled();
    }));
  });

  describe('test ngOnInit', () => {
    const REAL_CALLBACK_URL = 'myapp://auth';
    const FAKE_CALLBACK_URL = 'myotherapp://auth';

    beforeEach(fakeAsync(() => {
      spyOn(App, 'addListener');
      spyOn(Browser, 'close');
      spyOn(Browser, 'removeAllListeners');

      (Browser.close as any).and.returnValue(Promise.resolve());
      (Browser.removeAllListeners as any).and.returnValue(Promise.resolve());

      fixture.detectChanges();
      fixture.whenStable();
    }));

    it('should call "initializeGlobalListenersForMobileApp" on init', fakeAsync(() => {
      component.ngOnInit();

      spyOn(Capacitor, 'isNativePlatform').and.returnValue(true);

      (App.addListener as any).and.callFake((eventName: 'appUrlOpen', listenerFunc: URLOpenListener): Promise<void> => {
        listenerFunc({
          url: REAL_CALLBACK_URL,
        } as AppState & URLOpenListenerEvent & RestoredListenerEvent & BackButtonListenerEvent);

        return Promise.resolve();
      });

      fixture.detectChanges();
      fixture.whenStable();

      expect(Capacitor.isNativePlatform()).toBeTrue();

      App.addListener('appUrlOpen', (res) => {
        console.log('[res]', JSON.stringify(res, null, 2));
        expect(res.url).toBe(REAL_CALLBACK_URL);

        expect(Browser.close).toHaveBeenCalled();
        expect(Browser.close).toHaveBeenCalledTimes(1);

        expect(Browser.removeAllListeners).toHaveBeenCalled();
        expect(Browser.removeAllListeners).toHaveBeenCalledTimes(1);
      });

      expect(App.addListener).toHaveBeenCalled();
      expect(App.addListener).toHaveBeenCalledTimes(1);
    }));
  });
});
