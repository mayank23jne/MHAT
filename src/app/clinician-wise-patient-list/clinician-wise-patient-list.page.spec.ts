import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicianWisePatientListPage } from './clinician-wise-patient-list.page';

describe('ClinicianWisePatientListPage', () => {
  let component: ClinicianWisePatientListPage;
  let fixture: ComponentFixture<ClinicianWisePatientListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianWisePatientListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianWisePatientListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
