import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { AboutComponent } from './core/pages/about/about.component';
import { ResumeComponent } from './core/pages/resume/resume.component';
import { WorkComponent } from './core/pages/work/work.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { ServicesComponent } from './core/pages/services/services.component';
import { ProjectDetailComponent } from './core/pages/project-detail/project-detail.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { PrivacyComponent } from './core/pages/privacy/privacy.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'experience', redirectTo: 'resume', pathMatch: 'full' },
  { path: 'skills', redirectTo: 'resume', pathMatch: 'full' },
  { path: 'projects', component: WorkComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
