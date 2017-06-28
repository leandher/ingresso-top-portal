import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { LoginService } from './login.service';
import * as $ from 'jquery';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public cliente: Cliente;
  public mensagem: String;
  public tipoMensagem: String;
  

  constructor(fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  onSubmit(values: Object): void {
    this.submitted = true;
    this.cliente = new Cliente();
    if (this.form.valid) {
      this.cliente.email = this.email.value;
      this.cliente.senha = this.password.value;
      console.log(this.cliente);
      this.loginService.login(this.cliente)
                     .then(
                       response => {
                         this.cliente = response;
                         this.router.navigate(['/dashboard']);
                        }
                       )
                       .catch(
                         err => {
                           console.log(err.status);
                           switch (err.status){
                             case 400:
                                  this.mensagem = 'Combinação entre login e senha incorretos!';
                                  alert(this.mensagem);
                                  break;
                             case 500:
                                  this.mensagem = 'Erro no servidor';
                                  alert(this.mensagem);
                                  break;
                           }
                           console.log(this.mensagem);
                         }
                       );
    }
  }

  showMessage(message: String, type: String): void{
      this.mensagem = message;
      this.tipoMensagem = type;

      setTimeout(() => {
        	this.mensagem  = "";
    	}, 3000);

  }

  closeModal() {
    $('#loginModal').hideModal();    
  }
}
