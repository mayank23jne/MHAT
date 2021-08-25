import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClicianAddPage } from './clician-add.page';

describe('ClicianAddPage', () => {
  let component: ClicianAddPage;
  let fixture: ComponentFixture<ClicianAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClicianAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClicianAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
