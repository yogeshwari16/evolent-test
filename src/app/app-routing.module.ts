import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser'
import { AddEditContactComponent } from './contact/add-edit-contact/add-edit-contact.component';
import { MaterialModule } from './material/material.module'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './common/alert-box/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  {path: '', component: ContactComponent , pathMatch: 'full'},
  {path: 'contact' , component: ContactComponent, pathMatch: 'full'}
]
@NgModule({
  declarations: [ContactComponent,AddEditContactComponent,HeaderComponent, AlertComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,ReactiveFormsModule,FormsModule,HeaderComponent],
  entryComponents: [AddEditContactComponent,AlertComponent]
})
export class AppRoutingModule { }
