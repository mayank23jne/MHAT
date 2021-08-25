import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignVolunteerClinicPage } from './assign-volunteer-clinic.page';

describe('AssignVolunteerClinicPage', () => {
  let component: AssignVolunteerClinicPage;
  let fixture: ComponentFixture<AssignVolunteerClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVolunteerClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignVolunteerClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
