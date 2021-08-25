import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignDoctorListPage } from './assign-doctor-list.page';

describe('AssignDoctorListPage', () => {
  let component: AssignDoctorListPage;
  let fixture: ComponentFixture<AssignDoctorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDoctorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignDoctorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
