import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-form-identificate',
  templateUrl: './form-identificate.component.html',
  styleUrls: ['./form-identificate.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FormIdentificateComponent implements OnInit {
  //variables del componente
  @Input()editUser!: User;
  editUserForm!: FormGroup;
  nombreControl!:  FormControl;
  nombreLastControl!:  FormControl;
  dniControl!:  FormControl;
  constructor(private parent: FormGroupDirective, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    //creacion del formulario
  
    this.editUserForm = this.parent.form;
    this.editUserForm.addControl(
      'editUserFormIdentificate',
      this.formBuilder.group({
        nombreControl: ['', Validators.required],
        nombreLastControl: ['', Validators.required],
        dniControl: ['', [Validators.required, Validators.pattern(
          '(?=.*[A-Z])(?=.*[0-9]).{9,9}' ),]],
      })
    );
    if(this.editUser?.id){
      //si viene de edicion rellena los campos
      this.editUserForm.controls['editUserFormIdentificate'].setValue({nombreControl:this.editUser.name, nombreLastControl: this.editUser.last_name, dniControl:this.editUser.dni})
      this.editUserForm.controls['editUserFormIdentificate'].markAllAsTouched()

    }
  }

}
