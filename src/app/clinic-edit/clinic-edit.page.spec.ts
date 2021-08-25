import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicEditPage } from './clinic-edit.page';

describe('ClinicEditPage', () => {
  let component: ClinicEditPage;
  let fixture: ComponentFixture<ClinicEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
