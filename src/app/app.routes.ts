import { Routes } from '@angular/router';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            {path:'user-form',component:UserFormComponent}
    ]}
];
