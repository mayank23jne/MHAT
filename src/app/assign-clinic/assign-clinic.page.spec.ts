import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignClinicPage } from './assign-clinic.page';

describe('AssignClinicPage', () => {
  let component: AssignClinicPage;
  let fixture: ComponentFixture<AssignClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
