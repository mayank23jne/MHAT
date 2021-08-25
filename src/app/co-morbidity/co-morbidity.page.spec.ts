import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoMorbidityPage } from './co-morbidity.page';

describe('CoMorbidityPage', () => {
  let component: CoMorbidityPage;
  let fixture: ComponentFixture<CoMorbidityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoMorbidityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoMorbidityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
