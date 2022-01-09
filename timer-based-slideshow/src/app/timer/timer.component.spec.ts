import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start timer on button click', fakeAsync(() => {
    spyOn(component, 'onStart');
    const btn = fixture.debugElement.query(By.css('#startclick'));
    btn.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.onStart).toHaveBeenCalled();
    });
  }))

  it('should pause timer on button click', fakeAsync(() => {
    spyOn(component, 'onPause');
    const btn = fixture.debugElement.query(By.css('#pauseclick'));
    btn.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.onPause).toHaveBeenCalled();
    });
  }))
  
});
