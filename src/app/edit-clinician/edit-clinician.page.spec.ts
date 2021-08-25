import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditClinicianPage } from './edit-clinician.page';

describe('EditClinicianPage', () => {
  let component: EditClinicianPage;
  let fixture: ComponentFixture<EditClinicianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClinicianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditClinicianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
