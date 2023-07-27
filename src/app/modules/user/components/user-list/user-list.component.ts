import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { User, Users } from '../../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  //variables del componente
  listOfUsers: User[];
  loading: boolean;
  user_id: number;
  constructor(
    //servicios
    private userService: UserService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

 

  private loadUsers() {
    //metodo que muestra todos los usuarios y que mientras llega, muestra un spinner
    this.loading = true;
    this.userService.getUsers().subscribe({
      
      next: (data: Users) => {
        this.listOfUsers = data.user;       
      },
      error: () => {
        this.loading = false;
       
      },
      complete: () => {
        this.loading = false;
      },
    });
  }


  editUser(userId: number) {
    //metodo que envia al edicion de usuario
    this.router.navigate(['/users/edituser/', userId]);
  }
  visualUser(userId: number) {
    //metodo que envia al edicion de usuario
    this.router.navigate(['/users/visualuser/', userId]);
  }

  deleteUser(userId: number) {
    //metodo que elimina un usuario y recarga la tabla
    this.loading = true;
    this.user_id = parseInt(localStorage.getItem('id_usuario')!);
    this.userService.deleteUser(userId,this.user_id).subscribe({
      next: () => {
        this.loadUsers();
        this.message.success('Usuario borrado correctamente');
        this.loading = false;
      },
      error: (error:HttpErrorResponse) => {
        this.message.error('Se ha producido un error al borrar el usuario');
        this.loading = false;
      },
    });
  }


}
