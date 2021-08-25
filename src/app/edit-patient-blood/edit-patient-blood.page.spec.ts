import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPatientBloodPage } from './edit-patient-blood.page';

describe('EditPatientBloodPage', () => {
  let component: EditPatientBloodPage;
  let fixture: ComponentFixture<EditPatientBloodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatientBloodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPatientBloodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
