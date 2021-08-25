import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicineModalPage } from './medicine-modal.page';

describe('MedicineModalPage', () => {
  let component: MedicineModalPage;
  let fixture: ComponentFixture<MedicineModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicineModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
