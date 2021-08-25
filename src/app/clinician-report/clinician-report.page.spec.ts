import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicianReportPage } from './clinician-report.page';

describe('ClinicianReportPage', () => {
  let component: ClinicianReportPage;
  let fixture: ComponentFixture<ClinicianReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
