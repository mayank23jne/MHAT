import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSupervisorFeedbackPage } from './add-supervisor-feedback.page';

describe('AddSupervisorFeedbackPage', () => {
  let component: AddSupervisorFeedbackPage;
  let fixture: ComponentFixture<AddSupervisorFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupervisorFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSupervisorFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
