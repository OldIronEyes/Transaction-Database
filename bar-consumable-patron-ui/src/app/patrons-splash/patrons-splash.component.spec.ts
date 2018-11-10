import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronsSplashComponent } from './patrons-splash.component';

describe('PatronsSplashComponent', () => {
  let component: PatronsSplashComponent;
  let fixture: ComponentFixture<PatronsSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronsSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronsSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
