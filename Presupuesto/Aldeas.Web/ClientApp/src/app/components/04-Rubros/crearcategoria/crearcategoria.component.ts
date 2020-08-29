import { Component, OnInit, ViewChild } from '@angular/core';
import { Puc } from '../../../models/categorias/categoria.response';
import { CategoriaRequest } from '../../../models/categorias/categoria.request';
import { MatTable } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-crearcategoria',
  templateUrl: './crearcategoria.component.html',
  styleUrls: ['./crearcategoria.component.css']
})
export class CrearcategoriaComponent implements OnInit {
  @ViewChild('pucsTable') table: MatTable<Puc>;
  guardar: CategoriaRequest;
  Validaciones: boolean = false;
  NombrePrograma: string = "";
  PermitirGuardar: boolean = false;
  NotaIngles = "false";
  displayedColumns: string[] = ['position',
    'tipo', 'cuentaSIIGO', 'descripcionCuenta', 'cuentaNAV', 
    'detalleCuentaNav', 'tipoCuentaNav','fichaBanco',
     'requiereNotaIngles' ,'casa',
    'Quitar'];
  dataSource: Puc[] = []
  nuevoCeco: Puc = new Puc();
  formgroup: FormGroup;
  formgroup_2: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private service: CategoriasService
  ) { }

  eliminar(element: Puc) {
    this.dataSource = this.dataSource.filter(item => {
      return item.id != element.id
    })
    let conteointerno = 0;
    this.dataSource.forEach(item => {
      conteointerno += 1;
      item.id = conteointerno
    })

    this.PermitirGuardar = this.dataSource.length === 0 ? false : true


  }

  onchangeModel() {
    this.Validaciones = false
  }
  Agregar() {

    let conteo = this.dataSource.length + 1;
    this.nuevoCeco.id = conteo;
    this.nuevoCeco.requiereNotaIngles = this.NotaIngles ==="true"? true:false;
    //filtro cuando existe los dos subcentro y codigo
    // validamos en los quie ya tiene agregados
 
      this.dataSource.push(this.nuevoCeco);
      this.nuevoCeco = new Puc();
      this.table.renderRows();
      this.PermitirGuardar = true;
    
  }
  cerrar(){
    this.activeModal.close('dismmiss')
  }
  onGuardar() {
    this.guardar = new CategoriaRequest(this.NombrePrograma, this.dataSource);
    console.log(this.guardar)

    this.service.storeCategoria(this.guardar).subscribe(
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
    
    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
    })

    this.formgroup_2 = this._formBuilder.group({
   
      cuentaSIIGO: ['', Validators.required],
      descripcionCuenta: ['', Validators.required],
      cuentaNAV: ['', Validators.required],
      detalleCuentaNav: ['', Validators.required],
      fichaBanco: ['', Validators.nullValidator],
      casa: ['', Validators.nullValidator],

    })
  }

}
