import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [ButtonComponent, InputComponent],
  exports: [ButtonComponent, InputComponent],
})
export class LibraryModule {}
