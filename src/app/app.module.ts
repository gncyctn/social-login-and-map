import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule ,SocialAuthServiceConfig} from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider  } from 'angularx-social-login';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmptyComponent } from './layouts/empty/empty.component';
import { SiteComponent } from './layouts/site/site.component';

import{ AuthGuard } from './core/guards/auth.guard'
import { AuthService } from './core/services/auth.service'
import { CountryService } from './core/services/country.service'
import { rxjsService} from './core/services/rxjs.service'

import { CountriesMapModule } from 'countries-map';
import { HeaderComponent } from './shared/header/header.component';
import { MapComponent } from './map/map.component';
import { RegionComponent } from './shared/region/region.component';
import { RegionDetailComponent } from './shared/region/region-detail/region-detail.component';

import { AppFilterPipe } from './shared/header/app-filter.pipe';
import { ContextComponent } from './shared/context/context.component';
import { from } from 'rxjs';
import { PercentageComponent } from './shared/percentage/percentage.component';

import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmptyComponent,
    SiteComponent,
    HeaderComponent,
    MapComponent,
    RegionComponent,
    RegionDetailComponent,
    AppFilterPipe,
    ContextComponent,
    PercentageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    HttpClientModule,
    CountriesMapModule,
    ClickOutsideModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    CountryService,
    rxjsService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '476111754047-t1voadntcbm7a99c8d17k6nf20htv43t.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('177471750665225')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
