import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-noexitoso',
  templateUrl: './noexitoso.component.html',
  styleUrls: ['./noexitoso.component.css']
})
export class NoexitosoComponent implements OnInit {

  @Input() message: string;
  constructor( private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close(){
    this.activeModal.close("OK")
  }
}
