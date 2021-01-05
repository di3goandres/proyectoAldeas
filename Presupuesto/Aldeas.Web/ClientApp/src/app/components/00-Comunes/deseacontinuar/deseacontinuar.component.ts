import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deseacontinuar',
  templateUrl: './deseacontinuar.component.html',
  styleUrls: ['./deseacontinuar.component.css']
})
export class DeseacontinuarComponent implements OnInit {

  @Input() Titulo : string;
  @Input() mensaje : string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.close("OK")
  }
  closeNOOK(){
    this.activeModal.dismiss();
  }

}
