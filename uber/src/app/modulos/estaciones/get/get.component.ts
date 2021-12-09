import { Component, OnInit } from '@angular/core';


// --------------importaciones nuevas ------------------------
//import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
//import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'
import { EstacionModelo } from 'src/app/modelos/estacion.model';

// ------------------------------------------------------------

//!!!!!!!!!!!!!!!!!CODIGO PROTEGIDO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @Component({
//   selector: 'app-get',
//   templateUrl: './get.component.html',
//   styleUrls: ['./get.component.css']
// })
// export class GetComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private estacionService: EstacionesService) { }

  listado: EstacionModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  //--------------------------------------------------------------------
  //Implementamos metodo para traer información y eliminar información

  getAll(){
    this.estacionService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.estacionService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }


  //--------------------------------------------------------------------

}