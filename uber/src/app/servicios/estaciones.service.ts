import { Injectable } from '@angular/core';
// IMPORTACIONES NUEVA ==========================

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { UsuarioModelo } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';
import { EstacionModelo } from '../modelos/estacion.model';

//================================================


// !!!!!!!!!!! CODIGO PROTEGIDO !!!!!!!!!!!!!!!!
// @Injectable({
//   providedIn: 'root'
// })
// export class EstacionesService {

//   constructor() { }
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  constructor(private http: HttpClient, private seguridadService: SeguridadService) { 
    this.token = this.seguridadService.getToken();
  }

  url = "http://localhost:3000"
  token: string = ''


  //Metodo Crear Estaciones  ==========================

  store(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estaciones`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordx: estacion.coordx,
      coordy: estacion.coordy,
      tipo: estacion.tipo
      
    
    });
  }

  //Metodo Listar todos los Estaciones ===================================

  getAll(): Observable<EstacionModelo[]>{

    //console.log(this.token) // verificiación de cache --------------------

    return this.http.get<EstacionModelo[]>(`${this.url}/estaciones`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }


  // Metodo Actualizar un Estaciones ===================================

  update(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.put<EstacionModelo>(`${this.url}/estaciones/${estacion.id}`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordx: estacion.coordx,
      coordy: estacion.coordy,
      tipo: estacion.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


  // Metodo para eliminar Estaciones ===================================

  delete(id: string): Observable<EstacionModelo[]>{
    return this.http.delete<EstacionModelo[]>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  // Metodo para consultar un Estaciones ===================================

  getWithId(id: string): Observable<EstacionModelo>{
    return this.http.get<EstacionModelo>(`${this.url}/estaciones/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }





}

