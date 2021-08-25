import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SentListPage } from './sent-list.page';

describe('SentListPage', () => {
  let component: SentListPage;
  let fixture: ComponentFixture<SentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
