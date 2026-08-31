import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';

// All sections are now embedded within HomeComponent (single-page architecture).
// Sub-routes redirect to home so existing bookmarks/direct links still work.
const routes: Routes = [
  { path: '',        component: HomeComponent },
  { path: 'about',   redirectTo: '', pathMatch: 'full' },
  { path: 'resume',  redirectTo: '', pathMatch: 'full' },
  { path: 'services',redirectTo: '', pathMatch: 'full' },
  { path: 'contact', redirectTo: '', pathMatch: 'full' },
  { path: '**',      redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
