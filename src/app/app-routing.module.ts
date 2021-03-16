import { NgModule,ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { LoginComponent} from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { EmptyComponent} from './layouts/empty/empty.component'
import { SiteComponent} from './layouts/site/site.component'
import { RegionComponent} from './shared/region/region.component'
import { RegionDetailComponent} from './shared/region/region-detail/region-detail.component'

//const routes: Routes = [];



export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot([

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        
      },
      {
        path: 'region',
        component: RegionComponent,
        children: [
          {
            path: ':id',
            component: RegionDetailComponent
          },
        ]
      },
      
    ]

  },
  {
    path: '',
    canActivate: [],
    component: EmptyComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },

  // dfsdfsdf //
  {
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent
	},
  
  
], { useHash: false });

export const RoutedComponents = [
  DashboardComponent,
  LoginComponent,
  EmptyComponent,
  SiteComponent
]




// @NgModule({
//   imports: [RouterModule.forRoot(AppRoutes, { relativeLinkResolution: 'legacy' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
