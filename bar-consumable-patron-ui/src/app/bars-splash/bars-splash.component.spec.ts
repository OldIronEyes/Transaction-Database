import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsSplashComponent } from './bars-splash.component';

describe('BarsSplashComponent', () => {
  let component: BarsSplashComponent;
  let fixture: ComponentFixture<BarsSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarsSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
