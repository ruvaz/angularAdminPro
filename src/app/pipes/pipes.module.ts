import {NgModule} from '@angular/core';
import {ImagenPipe} from "./imagen.pipe";

// Modulo para centralizar todos los pipes   en lugar en app.module
@NgModule({
  declarations: [
    ImagenPipe
  ],
  exports:[
    ImagenPipe
  ],
  imports: [
    // CommonModule  // no se va a usar ngFor ni ngIf etc.. se omite
  ],
})
export class PipesModule { }
