import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignedPatientListPage } from './assigned-patient-list.page';

describe('AssignedPatientListPage', () => {
  let component: AssignedPatientListPage;
  let fixture: ComponentFixture<AssignedPatientListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedPatientListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedPatientListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
