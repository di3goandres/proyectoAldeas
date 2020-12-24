import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-cambiararchivo',
  templateUrl: './cambiararchivo.component.html',
  styleUrls: ['./cambiararchivo.component.css']
})
export class CambiararchivoComponent implements OnInit {
  @Input() id: string;
  ValidarArchivo: boolean = false;
  contentInclude = "application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  fileToUpload: File = null;
  constructor(
    public userService: UserService,
    private activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
  }

  Cerrar(){
    this.activeModal.dismiss();
  }
  handleFileInput(files: FileList) {

    if (this.contentInclude.includes(files.item(0).type)) {
      this.ValidarArchivo = true;

      this.fileToUpload = files.item(0);

    } else {
      this.ValidarArchivo = false;

    }
   
  }


  onGuardar(){
    this.userService.postFile(this.fileToUpload, this.id)
    .subscribe(
      response => {
       console.log(response);
       if(response.status == "OK"){

        this.activeModal.close("OK");
       }
      },
      error => {
        this.activeModal.close("NOK");
        console.log(error)
    
      },

    )
  }

  


}
