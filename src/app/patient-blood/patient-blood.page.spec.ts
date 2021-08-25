import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientBloodPage } from './patient-blood.page';

describe('PatientBloodPage', () => {
  let component: PatientBloodPage;
  let fixture: ComponentFixture<PatientBloodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBloodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientBloodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
