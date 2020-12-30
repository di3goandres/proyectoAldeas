import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { MatTable } from '@angular/material/table';
import { Ceco } from '../../../models/programas/programas.response';
import { ProgramaRequest } from '../../../models/programas/programas.request';
import { ProgramasService } from '../../../services/programas.service';
import { TipoProgramaResponseData } from '../../../models/tipoprograma/TipoPrograma.response';
import { FinanciadoresDatum } from 'src/app/models/financiadores/financiadores.response';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';

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
  Actuales: Ceco[] = [];
  displayedColumns: string[] = ['position',
    'CodicoCeco', 'NombreCeco', 'CodigoSubCeco', 'NombreSubCeco', 'Facility', 'Financiador','Quitar'];
  dataSourceCecos: Ceco[] = []
  nuevoCeco: Ceco = new Ceco();
  formgroup: FormGroup;
  formgroup_2: FormGroup;
  tipoProgramas: TipoProgramaResponseData[] = []
  TipoPrograma = "1";
  

  financiadores: FinanciadoresDatum[] = [];

  constructor(private _formBuilder: FormBuilder,
 
    private modalService: NgbModal,
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

  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });
   
    modalRef.result.then((result) => {


    }, (reason) => {


    });
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
      let nombre = this.financiadores.find(item=> {
        return item.id == this.nuevoCeco.idFinanciador
      })

      this.nuevoCeco.nombreFinanciador = nombre.nombre;
      console.log(this.nuevoCeco);

      this.dataSourceCecos.push(this.nuevoCeco);
      this.nuevoCeco = new Ceco();
      this.table.renderRows();
      this.PermitirGuardar = true;
    }
  }
  cerrar() {
    // this.activeModal.close('dismmiss')
  }
  onGuardar() {
    this.guardar = new ProgramaRequest(this.NombrePrograma, this.TipoPrograma, this.dataSourceCecos);
    console.log(this.guardar)

    this.programasService.storeProgramas(this.guardar).subscribe(
      OK => {
        if (OK.code == 200 && OK.status == "OK") {
          // this.activeModal.close('OK')
          this.openExitoso();
          this.dataSourceCecos= [];
          this.formgroup.reset()
           this.formgroup_2.reset()
        }
        console.log(OK)
      },
      ERROR => { console.log(ERROR) }

    );


  }
  async cargaInicial() {
    await this.servicePrograma.getTipoProgramas().subscribe(
      OK => {

        this.tipoProgramas = [];
        this.tipoProgramas.push(...OK.data)


      },
      Errr => { console.log(Errr) }

    )

    await this.servicePrograma.getFinanciadores().subscribe(
      OK => {

        this.financiadores = [];
        this.financiadores.push(...OK.financiadoresData)


      },
      Errr => { console.log(Errr) }

    )

    await this.servicePrograma.getProgramas().subscribe(
      OK => {


        this.Actuales = [];
        this.Actuales.push(...OK.cecos)



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
      financiador: ['', [Validators.required, Validators.min(1)]],




    })
  }

}
