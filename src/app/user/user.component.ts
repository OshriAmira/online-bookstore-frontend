import { Component , OnInit} from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{


  users: User[]=[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
        // Process the received data from the backend
        console.log(data);
        this.users = data;
      });
  }

  getRoleNames(user: User): string {
    if (user.roles) {
      return user.roles.map(role => role.name).join(', ');
    } else {
      return 'N/A';
    }
  }
  

}
