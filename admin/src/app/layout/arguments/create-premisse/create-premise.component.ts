import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ArgumentService } from 'src/app/service/argument.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './create-premise.component.html',
  styleUrls: ['./create-premise.component.scss'],
  animations: [routerTransition()]
})
export class CreatePremiseComponent implements OnInit {

  form: FormGroup;
  argument_id: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private argumentService: ArgumentService) {
    this.argument_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      argument_id: [this.argument_id, Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      form: ['', Validators.compose([Validators.required])],
      sentential_letters:['', Validators.compose([Validators.required])]
    });
  }

  doSubmit() {
    if (this.form.valid) {
      while(this.form.value.form.indexOf(" ") != -1){
        let str = this.form.value.form.replace(" ", "");
        this.form.value.form = str;
      }
      this.argumentService.addPremise(this.form.value).then((result: any) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            text: 'Premissa/Formalização cadastrada com sucesso',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl(`/arguments/view/${this.argument_id}`);
        }else{
          Swal.fire({
            icon: 'error',
            text: result.message,
            confirmButtonText: 'Ok'
            
          })
        }
      });
    }
  }
}
