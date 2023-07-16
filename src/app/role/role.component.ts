import { Component , OnInit} from '@angular/core';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  constructor(private roleService: RoleService) {}


  ngOnInit(): void {
    this.roleService.getRoles().subscribe((data: Role[]) => {
        // Process the received data from the backend
        console.log(data);
        this.roles = data;
      });
  }
}