import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedbyComponent } from './likedby.component';

describe('LikedbyComponent', () => {
  let component: LikedbyComponent;
  let fixture: ComponentFixture<LikedbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
