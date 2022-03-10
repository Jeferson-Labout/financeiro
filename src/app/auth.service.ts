import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL: string = environment.API + 'usuarios'
  tokenUrl: string = environment.API + environment.obterTokenUrl
  clientId: string = environment.clientId
  clientSecret: string = environment.clientSecret
  constructor(
    private http: HttpClient
  ) { }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, usuario)

  }

  tentarLogar(name: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', name)
      .set('password', password)
      .set('grant_type', 'password')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(this.tokenUrl, params.toString(), httpOptions)

  }
}
