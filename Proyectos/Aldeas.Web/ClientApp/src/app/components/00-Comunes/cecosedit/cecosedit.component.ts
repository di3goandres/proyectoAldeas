import { Component, Input, OnInit } from '@angular/core';
import { ItemsCentroCosto } from '../../../models/proyectos/proyecto.unico.response';

@Component({
  selector: 'app-cecosedit',
  templateUrl: './cecosedit.component.html',
  styleUrls: ['./cecosedit.component.css']
})
export class CecoseditComponent implements OnInit {
  displayedColumns: string[] = ['position',  'Nombre'];
  @Input() dataSource: ItemsCentroCosto[]=[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.dataSource)
  }

}
