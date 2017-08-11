import { LoginComponent } from './Login/login.component';
import { GreetingComponent } from './authenticate/greeting.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'atm', component: GreetingComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch:'full', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(routes);