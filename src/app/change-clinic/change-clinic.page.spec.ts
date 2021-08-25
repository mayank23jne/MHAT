import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeClinicPage } from './change-clinic.page';

describe('ChangeClinicPage', () => {
  let component: ChangeClinicPage;
  let fixture: ComponentFixture<ChangeClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
