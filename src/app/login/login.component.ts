import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario'
import { AuthService } from '../auth.service'
import toastr from "toastr";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submittingForm: boolean = false;
  name: string;
  password: string;
  loginError: boolean;
  mensagemSucesso: string;
  cadastrando: boolean;
  serverErrorMessages: string[] = null;


  constructor(
    private router: Router,
    private authService: AuthService

  ) { }

  onSubmit() {

    this.authService
      .tentarLogar(this.name, this.password)
      .subscribe(response => {
        this.router.navigate(['/reports'])
        console.log(response)
      }, error => {
        this.serverErrorMessages = ['Login e/ou Senha incorreto(a)']
      }
      )

  }
  preparaCadastrar(event) {
    event.preventDefault();

    this.cadastrando = true;
  }

  cancelarCadastro() {

    this.cadastrando = false;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.name = this.name;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe(response => {
        this.mensagemSucesso = 'Cadastro realizado com sucesso! Efetue o login.';
        this.cadastrando = false;
        this.name = '';
        this.password = '';
        this.serverErrorMessages = [];
      }, error => {
        this.actionsForError(error.error);
        this.mensagemSucesso = null;
      })
  }


  actionsForError(error) {
    toastr.error(error.titulo);
    console.log(error)
    this.submittingForm = false;

    if (error.status !== 400)
      this.serverErrorMessages = [' ' + error.titulo];
    else
      this.serverErrorMessages = [' ' + error.titulo]
  }


}
