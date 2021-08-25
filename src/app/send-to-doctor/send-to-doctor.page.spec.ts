import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendToDoctorPage } from './send-to-doctor.page';

describe('SendToDoctorPage', () => {
  let component: SendToDoctorPage;
  let fixture: ComponentFixture<SendToDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendToDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
