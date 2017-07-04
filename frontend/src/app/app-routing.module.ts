import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeStoreService } from "app/common/services";
import { FilesComponent } from "app/files/components/files.component";
import { LoginComponent } from "app/login/components/login.component";
import { FilesLsComponent } from "app/files/components/files-main-col/files-ls/files-ls.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/files', pathMatch: 'full', canActivate: [MeStoreService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'files', component: FilesComponent, canActivate: [MeStoreService], children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
