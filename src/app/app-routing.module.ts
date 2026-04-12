import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgxUiLoaderRouterModule } from 'ngx-ui-loader';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '', pathMatch:'full' },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    NgxUiLoaderRouterModule.forRoot({
        showForeground:true,
        exclude:[
            '/home',
            '/'
        ]
    }) 
],
    exports: [ RouterModule, NgxUiLoaderRouterModule ]
})

export class AppRoutingModule {}
