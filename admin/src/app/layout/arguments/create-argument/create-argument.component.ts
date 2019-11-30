import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ArgumentService } from 'src/app/service/argument.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './create-argument.component.html',
  styleUrls: ['./create-argument.component.scss'],
  animations: [routerTransition()]
})
export class CreateArgumentsComponent implements OnInit {

  form: FormGroup;
  user: any;

  constructor(private router: Router, private fb: FormBuilder, private argumentService: ArgumentService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      user_id: [this.user.id, Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      form: ['', Validators.compose([Validators.required])]
    });
  }

  doSubmit() {
    if (this.form.valid) {
      this.argumentService.addArgument(this.form.value).then((result: any) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            text: 'Argumento cadastrado com sucesso',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl('/arguments');
        }
      });
    }
  }
}
