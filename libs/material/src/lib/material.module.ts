import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import { NgModule } from '@angular/core';

const MATERIALS_MODULE = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatToolbarModule
];

const IMPORTS = [CommonModule, ...MATERIALS_MODULE];

const EXPORTS = [...MATERIALS_MODULE];

@NgModule({
  imports: IMPORTS,
  exports: EXPORTS
})
export class MaterialModule {}
