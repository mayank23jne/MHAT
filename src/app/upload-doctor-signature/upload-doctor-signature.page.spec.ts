import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadDoctorSignaturePage } from './upload-doctor-signature.page';

describe('UploadDoctorSignaturePage', () => {
  let component: UploadDoctorSignaturePage;
  let fixture: ComponentFixture<UploadDoctorSignaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDoctorSignaturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDoctorSignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
