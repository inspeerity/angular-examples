import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';

import { RouterEffects } from './router-store.effects';

@NgModule({
    imports: [ EffectsModule.forFeature([ RouterEffects ]) ],
})
export class RouterStoreModule {}
