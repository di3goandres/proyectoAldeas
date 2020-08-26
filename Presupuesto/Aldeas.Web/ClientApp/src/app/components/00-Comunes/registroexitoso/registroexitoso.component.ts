import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registroexitoso',
  templateUrl: './registroexitoso.component.html',
  styleUrls: ['./registroexitoso.component.css']
})
export class RegistroexitosoComponent implements OnInit {

  constructor(  private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }
  close(){
    this.activeModal.close("OK")
  }
}
