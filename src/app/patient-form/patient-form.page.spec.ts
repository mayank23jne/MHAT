import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientFormPage } from './patient-form.page';

describe('PatientFormPage', () => {
  let component: PatientFormPage;
  let fixture: ComponentFixture<PatientFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
