import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CliniciansPage } from './clinicians.page';

describe('CliniciansPage', () => {
  let component: CliniciansPage;
  let fixture: ComponentFixture<CliniciansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliniciansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CliniciansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
