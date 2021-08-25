import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadSignaturePage } from './upload-signature.page';

describe('UploadSignaturePage', () => {
  let component: UploadSignaturePage;
  let fixture: ComponentFixture<UploadSignaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSignaturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadSignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
