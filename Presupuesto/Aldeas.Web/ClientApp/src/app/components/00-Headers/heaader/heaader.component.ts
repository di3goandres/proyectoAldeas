import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-heaader',
  templateUrl: './heaader.component.html',
  styleUrls: ['./heaader.component.css']
})
export class HeaaderComponent implements OnInit {

  user: User;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(x=> this.user = x);
  }

}
