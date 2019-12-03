import { Component, OnInit } from '@angular/core';
import { ArgumentService } from 'src/app/services/argument.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  form: FormGroup;
  argument_id: number;
  argument: any;
  items: FormArray;
  isDisabled: boolean;
  interval: any;
  timer: number;
  usu_hash: any;
  exe_hash: any;

  constructor(
    private fb: FormBuilder,
    private argumentService: ArgumentService,
    private apiService: APIService,
    private route: ActivatedRoute) {
    this.usu_hash = this.getParamValueQueryString('usu_hash');
    this.exe_hash = this.getParamValueQueryString('exe_hash');
    this.argument_id = this.route.snapshot.params.argument_id;
  }

  ngOnInit() {
    this.getArgument();
    this.form = this.fb.group({
      items: this.fb.array([])
    });
    this.isDisabled = true;
    this.startTimer();
  }

  getParamValueQueryString(paramName) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  getArgument() {
    this.argumentService.getArgument(this.argument_id.toString()).then(result => {
      if (!result.error) {
        this.argument = result.data;
        if (this.argument) {
          this.argument.ArgumentPremises.map(item => {
            this.addItem(item);
          });
        }
      }
    })
  }

  get optionsArray() {
    return this.form.get('items') as FormArray;
  }

  createItem(data): FormGroup {
    return this.fb.group({
      id: [data.id, Validators.compose([Validators.required])],
      argument_id: [data.argument_id, Validators.compose([Validators.required])],
      description: [data.description, Validators.compose([Validators.required])],
      form: [{ disabled: true, value: '' }, Validators.compose([Validators.required, Validators.minLength(1)])],
      sentential_letters: [data.sentential_letters, Validators.compose([Validators.required])],
      type: [data.type, Validators.compose([Validators.required])]
    });
  }

  addItem(item): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem(item));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  validateConclusion(index) {
    if (this.argument.ArgumentPremises[index].type == 'CONCLUSION') {
      this.isDisabled = false;
      this.optionsArray.controls.forEach(control => {
        control.get('form').enable();
        Swal.fire(
          'Parabéns! Você marcou corretamente a conclusão.', 
          ' Prossiga para a formalização utilizando a sequencia de letras sentenciais listadas!',
          'success'
        )
      });
    } else {
      this.isDisabled = true;
      this.optionsArray.controls.forEach(control => {
        control.get('form').disable();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Esta não é a conclusão!',
          confirmButtonText: 'Tentar novamente'
        })
      });
    }
  }

  startTimer() {
    this.timer = 0;
    this.interval = setInterval(() => {
      this.timer++;
      this.enableResponse();
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  enableResponse() {
    if (this.isDisabled || !this.form.valid) {
      return true;
    } else {
      return false;
    }
  }

  sendResponse() {
    let count = 0;
    this.argument.ArgumentPremises.map(item => {
      this.form.value.items.map(response => {
        if (item.id == response.id) {
          while(response.form.indexOf(" ") != -1){
            let str = response.form.replace(" ", "");
            response.form = str;
          }
          console.log(response.form)
          if (item.form == response.form) {
            count++;
          }
        }
      });
    });
    if (count == this.argument.ArgumentPremises.length) {
        const data = {
          exe_hash: this.exe_hash,
          usx_completado: true,
          token: this.usu_hash,
          tempo_exercicio: this.timer
        }
          this.apiService.sendResponse(data,data.token).then(res => {
            if (res.status == false){
              Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: res.mensagem
              })
            }
          });
        }
     else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A formalização do argumento está incorreta. Tente novamente!',
      })
    }
  }

}
