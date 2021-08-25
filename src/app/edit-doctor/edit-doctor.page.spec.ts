import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDoctorPage } from './edit-doctor.page';

describe('EditDoctorPage', () => {
  let component: EditDoctorPage;
  let fixture: ComponentFixture<EditDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
