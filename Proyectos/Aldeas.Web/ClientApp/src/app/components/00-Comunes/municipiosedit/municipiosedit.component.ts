import { Component, Input, OnInit } from '@angular/core';
import { ItemsMunicipio } from '../../../models/proyectos/proyecto.unico.response';

@Component({
  selector: 'app-municipiosedit',
  templateUrl: './municipiosedit.component.html',
  styleUrls: ['./municipiosedit.component.css']
})
export class MunicipioseditComponent implements OnInit {
  displayedColumns: string[] = ['position',  'Departamento', 'Municipio'];
  @Input() dataSource:  ItemsMunicipio[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
