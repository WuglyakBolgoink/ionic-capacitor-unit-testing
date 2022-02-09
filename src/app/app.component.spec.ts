import {
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { App } from '@capacitor/app';
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
});
