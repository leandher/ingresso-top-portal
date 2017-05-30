import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './login.routing';
import { Login } from './login.component';
import { LoginService } from './login.service';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Login,
  ],
  providers: [
    LoginService,
    NgbActiveModal, 
    NgbModal,
  ],
})
export class LoginModule {
  
}
