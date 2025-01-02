import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { AboutComponent } from './core/pages/about/about.component';
import { ResumeComponent } from './core/pages/resume/resume.component';
import { ServicesComponent } from './core/pages/services/services.component';
import { ContactComponent } from './core/pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent } // Default route
  ,{path:'about',component:AboutComponent},
  {path:'resume',component:ResumeComponent},
  {path:'services',component:ServicesComponent},
  {path:'contact',component:ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
