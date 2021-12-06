import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient, private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }

  //Metodo Crear Usuarios ==========================

  store(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(`${this.url}/usuarios`, {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      correo: usuario.correo
    });
  }

  //Metodo Listar todos los usuarios ===================================

  getAll(): Observable<UsuarioModelo[]>{

    //console.log(this.token) // verificiación de cache --------------------

    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }


  // Metodo Actualizar un Usuario ===================================

  update(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.put<UsuarioModelo>(`${this.url}/usuarios/${usuario.id}`, {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      correo: usuario.correo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


  // Metodo para eliminar Usuario ===================================

  delete(id: string): Observable<UsuarioModelo[]>{
    return this.http.delete<UsuarioModelo[]>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  // Metodo para consultar un usuario ===================================

  getWithId(id: string): Observable<UsuarioModelo>{
    return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }








}
