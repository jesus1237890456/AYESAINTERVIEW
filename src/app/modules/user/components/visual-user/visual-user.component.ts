import { editParam } from '../../../../shared/interfaces/editentity.interfaces';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserOne } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-visual-user',
  templateUrl: './visual-user.component.html',
  styleUrls: ['./visual-user.component.scss'],
})
export class VisualUserComponent implements OnInit {
//variables del componente
  activateForm: boolean = false;
  public editUserForm: FormGroup = new FormGroup({});
  editUser!: User;
  activationParam: editParam = {
    id: 0,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private routeActivated: ActivatedRoute,
    private message: NzMessageService
  ) {}

  get f() {
    return this.editUserForm.controls;
  }

  ngOnInit(): void {
    //falso refresco del componente
    this.activateForm = false;
//obtencion del id por ruta
    this.activationParam = {
      id: this.routeActivated.snapshot.params.userId,
    };
  //llamada al metodo de obtencion de un usuario por id
    this.userService.getUser(this.activationParam.id).subscribe({
      next: (dataUser: UserOne) => {
        this.editUser = dataUser.user;
      },
      complete: () => {
        this.activateForm = true;
      },
    });
  }
//metodo para volver atras
  public clickVolver() {
    this.router.navigate(['/users']);
  }
 
}
