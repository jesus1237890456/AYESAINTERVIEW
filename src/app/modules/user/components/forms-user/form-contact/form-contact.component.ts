import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FormContactComponent implements OnInit {
  //variables del componente y el input que recibe de edicion o de creacion usuario
  @Input() editUser!: User;
  editUserForm!: FormGroup;
  edit: boolean = true;

  constructor(private parent: FormGroupDirective, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //comprobacion de si viene de edicion o creacion de usuario
    if (this.editUser?.id) {
      //edicion donde se setean los campos segun los datos enviados
      this.editUserForm = this.parent.form;
      this.editUserForm.addControl(
        'editUserFormContact',
        this.formBuilder.group({
          emailControl: ['', Validators.email]

        }))
        this.editUserForm.controls['editUserFormContact'].setValue(
          {emailControl: this.editUser.mail}
        );
        this.editUserForm.controls['editUserFormContact'].markAllAsTouched()
    }
    if (!this.editUser?.id) {
      //creacion de usuario
      this.edit = false;
      this.editUserForm = this.parent.form;
      this.editUserForm.addControl(
        'editUserFormContact',
        this.formBuilder.group({
          emailControl: ['',Validators.email]
        }));

    }
  }

}
