import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileLayoutComponent } from './layout/layout.component';
import { routes as profileRoutes } from './profile.routes';

const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: profileRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ProfileLayoutComponent],
  exports: [RouterModule],
})
export class ProfileModule {}
