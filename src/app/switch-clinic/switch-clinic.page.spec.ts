import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchClinicPage } from './switch-clinic.page';

describe('SwitchClinicPage', () => {
  let component: SwitchClinicPage;
  let fixture: ComponentFixture<SwitchClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
