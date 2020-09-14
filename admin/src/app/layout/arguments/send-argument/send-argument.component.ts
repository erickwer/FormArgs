import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ArgumentService } from 'src/app/service/argument.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { APIService } from 'src/app/service/api.service'

@Component({
  templateUrl: './send-argument.component.html',
  styleUrls: ['./send-argument.component.scss'],
  animations: [routerTransition()]
})
export class SendArgumentComponent implements OnInit {

  form: FormGroup;
  argument_id: any;
  rewards: any;
  levels: any;
  arr = [];
  levelArray = [];
  valores: any;
  url: any;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private apiService: APIService) {
    this.argument_id = this.route.snapshot.params.id;
    this.returnLevels()
    console.log(this.argument_id)
  }

  ngOnInit() {
    this.form = this.fb.group({
      rec_codigo: [''],
      niv_codigo: ['', Validators.compose([Validators.required])],
      exe_nome: ['', Validators.compose([Validators.required])],
      exe_descricao: ['']
    });

  }

  doSubmit() {
    if (this.form.valid) {
      let arrayRevLev = this.form.value.niv_codigo.split(',')
      const data = {
        rec_codigo: arrayRevLev[1],
        niv_codigo: arrayRevLev[0],
        exe_nome: this.form.value.exe_nome,
        exe_descricao: this.form.value.exe_nome,
        exe_link:`https://formalizacao-argumentos.thelogiclive.com/exercise/${this.argument_id}`,
        exe_tempoexecucao: 0,
        exe_ativo: true
      }
      console.log(data)
      this.apiService.sendExercise(data).then(res => {
        if (res.status == false) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: res.mensagem
          })
        }
        else{
          Swal.fire(
            'Exercício cadastrado com sucesso!',
            'Clique para continuar!',
            'success'
          )}
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado com o formulário. Tente novamente!',
      })
    }
  }

  returnLevels() {
    this.apiService.getLevels()
      .then((result: any) => {
        if (!result.error) {
          this.levels = Object.values(result.data)
          console.log(this.levels)
        }
      });
  }

}
