import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateSupervisorFeedbackPage } from './update-supervisor-feedback.page';

describe('UpdateSupervisorFeedbackPage', () => {
  let component: UpdateSupervisorFeedbackPage;
  let fixture: ComponentFixture<UpdateSupervisorFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSupervisorFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateSupervisorFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
