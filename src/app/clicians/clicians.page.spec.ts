import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CliciansPage } from './clicians.page';

describe('CliciansPage', () => {
  let component: CliciansPage;
  let fixture: ComponentFixture<CliciansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliciansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CliciansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
