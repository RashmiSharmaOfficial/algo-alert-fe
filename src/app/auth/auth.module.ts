import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { AuthRoutingModule } from './auth.routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [

  ]
})
export class AuthModule { }