import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownDatesComponent } from './drop-down-dates.component';

describe('DropDownDatesComponent', () => {
  let component: DropDownDatesComponent;
  let fixture: ComponentFixture<DropDownDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownDatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropDownDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
