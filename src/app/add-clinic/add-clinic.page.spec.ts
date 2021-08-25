import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddClinicPage } from './add-clinic.page';

describe('AddClinicPage', () => {
  let component: AddClinicPage;
  let fixture: ComponentFixture<AddClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
