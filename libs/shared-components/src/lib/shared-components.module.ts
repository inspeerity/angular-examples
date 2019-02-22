import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule
} from "@angular/material";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModulesModule } from "@inspeerity/shared-modules";

import { HeaderComponent } from "./header/header.component";

const MATERIALS_MODULE = [
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule
];

const IMPORTS = [RouterModule, SharedModulesModule, ...MATERIALS_MODULE];
const EXPORTS = [HeaderComponent, ...MATERIALS_MODULE];
const DECLARATIONS = [HeaderComponent];

@NgModule({
  imports: IMPORTS,
  declarations: DECLARATIONS,
  exports: EXPORTS
})
export class SharedComponentsModule {}
