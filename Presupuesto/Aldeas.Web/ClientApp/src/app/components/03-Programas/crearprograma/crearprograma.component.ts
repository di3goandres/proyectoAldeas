import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { MatTable } from '@angular/material/table';
import { Ceco } from '../../../models/programas/programas.response';
import { ProgramaRequest } from '../../../models/programas/programas.request';
import { ProgramasService } from '../../../services/programas.service';
import { TipoProgramaResponseData } from '../../../models/tipoprograma/TipoPrograma.response';

@Component({
  selector: 'app-crearprograma',
  templateUrl: './crearprograma.component.html',
  styleUrls: ['./crearprograma.component.css']
})
export class CrearprogramaComponent implements OnInit {
  @ViewChild('cecosTable') table: MatTable<Ceco>;
  guardar: ProgramaRequest;
  Validaciones: boolean = false;
  NombrePrograma: string = "";
  PermitirGuardar: boolean = false;
  @Input() Actuales: Ceco[] = [];
  displayedColumns: string[] = ['position',
    'CodicoCeco', 'NombreCeco', 'CodigoSubCeco', 'NombreSubCeco', 'Facility', 'Quitar'];
  dataSourceCecos: Ceco[] = []
  nuevoCeco: Ceco = new Ceco();
  formgroup: FormGroup;
  formgroup_2: FormGroup;
  tipoProgramas: TipoProgramaResponseData[] = []
  TipoPrograma = "1";
  constructor(private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private programasService: ProgramasService,
    private servicePrograma: ProgramasService,

  ) { }

  eliminar(element: Ceco) {
    this.dataSourceCecos = this.dataSourceCecos.filter(item => {
      return item.id != element.id
    })
    let conteointerno = 0;
    this.dataSourceCecos.forEach(item => {
      conteointerno += 1;
      item.id = conteointerno
    })

    this.PermitirGuardar = this.dataSourceCecos.length === 0 ? false : true


  }

  onchangeModel() {
    this.Validaciones = false
  }
  Agregar() {

    let conteo = this.dataSourceCecos.length + 1;
    this.nuevoCeco.id = conteo;
    //filtro cuando existe los dos subcentro y codigo
    let filtro = this.Actuales.filter(item => {
      return item.codigoCeco == this.nuevoCeco.codigoCeco
        && item.subCentro == this.nuevoCeco.subCentro
    })
    //filtro cuando existe solo el centro
    let filtro_2 = this.Actuales.filter(item => {
      return item.codigoCeco == this.nuevoCeco.codigoCeco
    })
    // validamos en los quie ya tiene agregados
    let filtro_3 = this.dataSourceCecos.filter(item => {
      return item.codigoCeco == this.nuevoCeco.codigoCeco
        && item.subCentro == this.nuevoCeco.subCentro

    })
    //filtro cuando existe solo el centro

    if (filtro.length > 0 || filtro_2.length > 0 ||
      filtro_3.length > 0) {
      this.Validaciones = true
    } else {
      this.Validaciones = false
    }
    if (!this.Validaciones) {
      this.dataSourceCecos.push(this.nuevoCeco);
      this.nuevoCeco = new Ceco();
      this.table.renderRows();
      this.PermitirGuardar = true;
    }
  }
  cerrar(){
    this.activeModal.close('dismmiss')
  }
  onGuardar() {
    this.guardar = new ProgramaRequest(this.NombrePrograma, this.TipoPrograma, this.dataSourceCecos);
    console.log(this.guardar)

    this.programasService.storeProgramas(this.guardar).subscribe(
      OK => {
        if (OK.code == 200 && OK.status == "OK") {
          this.activeModal.close('OK')
        }
        console.log(OK)
      },
      ERROR => { console.log(ERROR) }

    );


  }
  cargaInicial() {
    this.servicePrograma.getTipoProgramas().subscribe(
      OK => {

        this.tipoProgramas = [];
        this.tipoProgramas.push(...OK.data)
      

      },
      Errr => { console.log(Errr) }

    )
  }
  ngOnInit(): void {
    
    this.cargaInicial();
    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
      tipoProgroma: ['', Validators.required],

    })


    this.formgroup_2 = this._formBuilder.group({

      codigoCeco: ['', Validators.required],
      NombreCeco: ['', Validators.required],
      SubcodigoCeco: ['', Validators.required],
      NombreSubCeco: ['', Validators.required],
      Facility: ['', Validators.required],
   


    })
  }

}
