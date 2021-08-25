import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicianAddPage } from './clinician-add.page';

describe('ClinicianAddPage', () => {
  let component: ClinicianAddPage;
  let fixture: ComponentFixture<ClinicianAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
