import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../../../models/categorias/categoria.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-actualizarcategoria',
  templateUrl: './actualizarcategoria.component.html',
  styleUrls: ['./actualizarcategoria.component.css']
})
export class ActualizarcategoriaComponent implements OnInit {

  @Input() categoria: Categoria;
  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;

  categoriaActualizar: Categoria
  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private categoriaService: CategoriasService
  ) { }
  cerrar(){
    this.activeModal.close('dismmiss')
  }

  onGuardar(){

    this.categoriaActualizar = new Categoria();
    this.categoriaActualizar.id =  this.categoria.id
    
    this.categoriaActualizar.nombre = this.NuevoNombre;
    this.categoriaActualizar.estado =  this.activo === "true"? true:false;

    console.log( this.categoriaActualizar);
    this.categoriaService.updateCategoria(this.categoriaActualizar)
    .subscribe(
      
      OK => {
        if (OK.code == 200 && OK.status == "OK") {
          this.activeModal.close('OK')
        }
        console.log(OK)
      },
      ERROR => { console.log(ERROR) }
    );

  }
  ngOnInit(): void {
    this.activo = this.categoria.estado === true ?  "true":"false"
    this.NuevoNombre = this.categoria.nombre;
 
    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
  

    })
  }

}
