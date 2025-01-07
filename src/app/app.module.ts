import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/pages/navbar/navbar.component';
import { HomeComponent } from './core/pages/home/home.component';
import { AboutComponent } from './core/pages/about/about.component';
import { CardsComponent } from './core/components/cards/cards.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ResumeComponent } from './core/pages/resume/resume.component';
import { ServicesComponent } from './core/pages/services/services.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './core/pages/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader  } from '../../app-translate-loader';
import { SelectComponent } from './core/components/select/select.component';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { DarkModeToggleComponent } from './core/components/dark-mode-toggle/dark-mode-toggle.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// Export this function to use it in the provideLottieOptions method
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    CardsComponent,
    SafeHtmlPipe,
    ResumeComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    SelectComponent,
    DarkModeToggleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPageScrollCoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    LottieComponent ,
  

  ],
  providers: [
    provideLottieOptions({
      player: playerFactory, // Use the Lottie player factory
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
