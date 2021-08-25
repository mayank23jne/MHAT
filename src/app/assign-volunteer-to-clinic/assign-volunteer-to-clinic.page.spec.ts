import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignVolunteerToClinicPage } from './assign-volunteer-to-clinic.page';

describe('AssignVolunteerToClinicPage', () => {
  let component: AssignVolunteerToClinicPage;
  let fixture: ComponentFixture<AssignVolunteerToClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVolunteerToClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignVolunteerToClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
