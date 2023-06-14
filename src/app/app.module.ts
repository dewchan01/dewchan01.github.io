import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PrizesComponent } from './components/prizes/prizes.component';
import { RulesComponent } from './components/rules/rules.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from './components/loading-page/loading.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GearComponent } from './components/gear/gear.component';
import { CircuitSvgComponent } from './components/circuit-svg/circuit-svg.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RulesComponent,
    EventDetailsComponent,
    FaqComponent,
    PrizesComponent,
    BannerComponent,
    FooterComponent,
    LoadingComponent,
    GearComponent,
    CircuitSvgComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxUiLoaderModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HomeComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
