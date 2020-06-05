import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCenterComponent } from './deal-center.component';

describe('DealCenterComponent', () => {
  let component: DealCenterComponent;
  let fixture: ComponentFixture<DealCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
