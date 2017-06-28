import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { Cliente } from '../cliente';
import { RegisterService } from './register.service';


@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public cpf:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public cliente: Cliente;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private registerService: RegisterService, private router: Router, private location: Location) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'cpf': ['', Validators.compose([Validators.required, Validators.minLength(11)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.cpf = this.form.controls['cpf'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit():void {
    this.submitted = true;
    this.cliente = new Cliente();
    if (this.form.valid) {
      this.cliente.nome = this.name.value;
      this.cliente.email = this.email.value;
      this.cliente.senha = this.password.value;
      this.cliente.cpf = this.cpf.value;
      console.log(this.cliente);
      this.registerService.save(this.cliente)
                     .then(
                       response => {
                         this.cliente = response;
                         this.location.back();
                       }
                       ).catch(
                         err => {
                           this.cliente = null;
                           this.location.back();
                          }
                       );
    }
  }
}
