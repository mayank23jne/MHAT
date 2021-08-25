import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicineListPage } from './medicine-list.page';

describe('MedicineListPage', () => {
  let component: MedicineListPage;
  let fixture: ComponentFixture<MedicineListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicineListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
