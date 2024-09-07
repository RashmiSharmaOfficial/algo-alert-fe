import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { AuthRoutingModule } from './auth.routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireAuthModule, // Import AngularFireAuthModule
  ],
  providers: [
   
  ]
})
export class AuthModule { }
