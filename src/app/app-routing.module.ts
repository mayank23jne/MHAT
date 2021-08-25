import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'sign-in',
  //   pathMatch: 'full'
  // },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule,), canActivate : [AuthGuardService] 
  },
  {
    path: 'patient-list',
    loadChildren: () => import('./patient-list/patient-list.module').then( m => m.PatientListPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('./add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  },
  {
    path: 'patient-details/:id1/:id',
    loadChildren: () => import('./patient-details/patient-details.module').then( m => m.PatientDetailsPageModule)
  },
  {
    path: 'add-diagnosis/:id',
    loadChildren: () => import('./add-diagnosis/add-diagnosis.module').then( m => m.AddDiagnosisPageModule)
  },
  {
    path: 'patient-history/:id',
    loadChildren: () => import('./patient-history/patient-history.module').then( m => m.PatientHistoryPageModule)
  },
  {
    path: 'patient-blood/:id',
    loadChildren: () => import('./patient-blood/patient-blood.module').then( m => m.PatientBloodPageModule)
  },
  {
    path: 'notes/:id',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'schedule-appointment/:id',
    loadChildren: () => import('./schedule-appointment/schedule-appointment.module').then( m => m.ScheduleAppointmentPageModule)
  },
  {
    path: 'add-prescription/:id',
    loadChildren: () => import('./add-prescription/add-prescription.module').then( m => m.AddPrescriptionPageModule)
  },
  {
    path: 'medicine-modal',
    loadChildren: () => import('./modals/medicine-modal/medicine-modal.module').then( m => m.MedicineModalPageModule)
  },
  {
    path: 'edit-prescription/:id',
    loadChildren: () => import('./edit-prescription/edit-prescription.module').then( m => m.EditPrescriptionPageModule)
  },
  {
    path: 'edit-patient-blood/:id',
    loadChildren: () => import('./edit-patient-blood/edit-patient-blood.module').then( m => m.EditPatientBloodPageModule)
  },
  {
    path: 'add-doctor',
    loadChildren: () => import('./add-doctor/add-doctor.module').then( m => m.AddDoctorPageModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./doctors/doctors.module').then( m => m.DoctorsPageModule)
  },
  {
    path: 'volunteer',
    loadChildren: () => import('./volunteer/volunteer.module').then( m => m.VolunteerPageModule)
  },
  {
    path: 'volunteer-add',
    loadChildren: () => import('./volunteer-add/volunteer-add.module').then( m => m.VolunteerAddPageModule)
  },
  {
    path: 'clinics',
    loadChildren: () => import('./clinics/clinics.module').then( m => m.ClinicsPageModule)
  },
  {
    path: 'add-clinic',
    loadChildren: () => import('./add-clinic/add-clinic.module').then( m => m.AddClinicPageModule)
  },
  {
    path: 'assign-clinic',
    loadChildren: () => import('./assign-clinic/assign-clinic.module').then( m => m.AssignClinicPageModule)
  },
  {
    path: 'assign-doctor-list',
    loadChildren: () => import('./assign-doctor-list/assign-doctor-list.module').then( m => m.AssignDoctorListPageModule)
  },
  {
    path: 'volunteer-list/:id',
    loadChildren: () => import('./volunteer-list/volunteer-list.module').then( m => m.VolunteerListPageModule)
  },
  {
    path: 'assign-volunteer',
    loadChildren: () => import('./assign-volunteer/assign-volunteer.module').then( m => m.AssignVolunteerPageModule)
  },
  {
    path: 'schedule-list',
    loadChildren: () => import('./schedule-list/schedule-list.module').then( m => m.ScheduleListPageModule)
  },
  {
    path: 'todays-appointment',
    loadChildren: () => import('./todays-appointment/todays-appointment.module').then( m => m.TodaysAppointmentPageModule)
  },
  {
    path: 'appointment-list',
    loadChildren: () => import('./appointment-list/appointment-list.module').then( m => m.AppointmentListPageModule)
  },
  {
    path: 'volunteer-appointment',
    loadChildren: () => import('./volunteer-appointment/volunteer-appointment.module').then( m => m.VolunteerAppointmentPageModule)
  },
  {
    path: 'clicians',
    loadChildren: () => import('./clicians/clicians.module').then( m => m.CliciansPageModule)
  },
  {
    path: 'clician-add',
    loadChildren: () => import('./clician-add/clician-add.module').then( m => m.ClicianAddPageModule)
  },
  {
    path: 'clinicians',
    loadChildren: () => import('./clinicians/clinicians.module').then( m => m.CliniciansPageModule)
  },
  {
    path: 'clinician-add',
    loadChildren: () => import('./clinician-add/clinician-add.module').then( m => m.ClinicianAddPageModule)
  },
  {
    path: 'view-note',
    loadChildren: () => import('./modals/view-note/view-note.module').then( m => m.ViewNotePageModule)
  },
  {
    path: 'edit-note/:id',
    loadChildren: () => import('./edit-note/edit-note.module').then( m => m.EditNotePageModule)
  },
  {
    path: 'notes-details',
    loadChildren: () => import('./notes-details/notes-details.module').then( m => m.NotesDetailsPageModule)
  },
  {
    path: 'patient-note-detail/:id',
    loadChildren: () => import('./patient-note-detail/patient-note-detail.module').then( m => m.PatientNoteDetailPageModule)
  },
  {
    path: 'send-to-doctor/:id',
    loadChildren: () => import('./send-to-doctor/send-to-doctor.module').then( m => m.SendToDoctorPageModule)
  },
  {
    path: 'doctor-patient-list',
    loadChildren: () => import('./doctor-patient-list/doctor-patient-list.module').then( m => m.DoctorPatientListPageModule)
  },
  {
    path: 'assign-volunteer-to-clinic',
    loadChildren: () => import('./assign-volunteer-to-clinic/assign-volunteer-to-clinic.module').then( m => m.AssignVolunteerToClinicPageModule)
  },
  {
    path: 'assign-volunteer-clinic',
    loadChildren: () => import('./assign-volunteer-clinic/assign-volunteer-clinic.module').then( m => m.AssignVolunteerClinicPageModule)
  },
  {
    path: 'add-supervisor-feedback/:id',
    loadChildren: () => import('./add-supervisor-feedback/add-supervisor-feedback.module').then( m => m.AddSupervisorFeedbackPageModule)
  },
  {
    path: 'update-supervisor-feedback/:id',
    loadChildren: () => import('./update-supervisor-feedback/update-supervisor-feedback.module').then( m => m.UpdateSupervisorFeedbackPageModule)
  },
  {
    path: 'reschedule-appointment/:id',
    loadChildren: () => import('./reschedule-appointment/reschedule-appointment.module').then( m => m.RescheduleAppointmentPageModule)
  },
  {
    path: 'patient-form',
    loadChildren: () => import('./patient-form/patient-form.module').then( m => m.PatientFormPageModule)
  },
  {
    path: 'change-status',
    loadChildren: () => import('./modals/change-status/change-status.module').then( m => m.ChangeStatusPageModule)
  },
  {
    path: 'volunteer-patient',
    loadChildren: () => import('./volunteer-patient/volunteer-patient.module').then( m => m.VolunteerPatientPageModule)
  },
  {
    path: 'upload-signature',
    loadChildren: () => import('./upload-signature/upload-signature.module').then( m => m.UploadSignaturePageModule)
  },
  {
    path: 'sent-list',
    loadChildren: () => import('./sent-list/sent-list.module').then( m => m.SentListPageModule)
  },
  {
    path: 'co-morbidity/:id',
    loadChildren: () => import('./co-morbidity/co-morbidity.module').then( m => m.CoMorbidityPageModule)
  },
  {
    path: 'edit-doctor/:id',
    loadChildren: () => import('./edit-doctor/edit-doctor.module').then( m => m.EditDoctorPageModule)
  },
  {
    path: 'edit-clinician/:id',
    loadChildren: () => import('./edit-clinician/edit-clinician.module').then( m => m.EditClinicianPageModule)
  },
  {
    path: 'profile-update-log',
    loadChildren: () => import('./profile-update-log/profile-update-log.module').then( m => m.ProfileUpdateLogPageModule)
  },
  {
    path: 'profile-log-detail/:id/:id2',
    loadChildren: () => import('./profile-log-detail/profile-log-detail.module').then( m => m.ProfileLogDetailPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'clinician-report',
    loadChildren: () => import('./clinician-report/clinician-report.module').then( m => m.ClinicianReportPageModule)
  },
  {
    path: 'clinician-wise-patient-list',
    loadChildren: () => import('./clinician-wise-patient-list/clinician-wise-patient-list.module').then( m => m.ClinicianWisePatientListPageModule)
  },
  {
    path: 'appointment-report',
    loadChildren: () => import('./appointment-report/appointment-report.module').then( m => m.AppointmentReportPageModule)
  },
  {
    path: 'doctor-appointment-report',
    loadChildren: () => import('./doctor-appointment-report/doctor-appointment-report.module').then( m => m.DoctorAppointmentReportPageModule)
  },
  {
    path: 'assigned-patient-list/:id',
    loadChildren: () => import('./assigned-patient-list/assigned-patient-list.module').then( m => m.AssignedPatientListPageModule)
  },
  {
    path: 'volunteer-appointment-list',
    loadChildren: () => import('./volunteer-appointment-list/volunteer-appointment-list.module').then( m => m.VolunteerAppointmentListPageModule)
  },
  {
    path: 'clinic-edit/:id',
    loadChildren: () => import('./clinic-edit/clinic-edit.module').then( m => m.ClinicEditPageModule)
  },
  {
    path: 'preview-prescription',
    loadChildren: () => import('./modal/preview-prescription/preview-prescription.module').then( m => m.PreviewPrescriptionPageModule)
  },
  {
    path: 'upload-doctor-signature/:id',
    loadChildren: () => import('./upload-doctor-signature/upload-doctor-signature.module').then( m => m.UploadDoctorSignaturePageModule)
  },
  {
    path: 'change-clinic/:id',
    loadChildren: () => import('./change-clinic/change-clinic.module').then( m => m.ChangeClinicPageModule)
  },
  {
    path: 'medicine-list',
    loadChildren: () => import('./medicine-list/medicine-list.module').then( m => m.MedicineListPageModule)
  },
  {
    path: 'update-medicine-modal',
    loadChildren: () => import('./modals/update-medicine-modal/update-medicine-modal.module').then( m => m.UpdateMedicineModalPageModule)
  },
  {
    path: 'view-upcoming-appointment',
    loadChildren: () => import('./modals/view-upcoming-appointment/view-upcoming-appointment.module').then( m => m.ViewUpcomingAppointmentPageModule)
  },
  {
    path: 'switch-clinic',
    loadChildren: () => import('./switch-clinic/switch-clinic.module').then( m => m.SwitchClinicPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule {}
