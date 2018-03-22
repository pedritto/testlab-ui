import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/testcases', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }

