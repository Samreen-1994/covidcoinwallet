import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSupervisorsComponent } from './show-supervisors.component';

describe('ShowSupervisorsComponent', () => {
  let component: ShowSupervisorsComponent;
  let fixture: ComponentFixture<ShowSupervisorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSupervisorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
