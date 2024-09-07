import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  imports: [CommonModule, DashboardRoutingModule, RouterModule, MaterialModule],
})
export class DashboardModule {}
