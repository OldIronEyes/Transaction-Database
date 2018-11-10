import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersSplashComponent } from './beers-splash.component';

describe('BeersSplashComponent', () => {
  let component: BeersSplashComponent;
  let fixture: ComponentFixture<BeersSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeersSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
