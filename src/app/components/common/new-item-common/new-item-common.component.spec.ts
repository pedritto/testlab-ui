import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemCommonComponent } from './new-item-common.component';

describe('NewItemCommonComponent', () => {
  let component: NewItemCommonComponent;
  let fixture: ComponentFixture<NewItemCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
