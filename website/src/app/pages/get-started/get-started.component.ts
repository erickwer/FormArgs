import { Component, OnInit } from '@angular/core';
import { ArgumentService } from 'src/app/services/argument.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ResponseService } from 'src/app/services/response.service';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  argument_id: number;
  timer: number;
  usu_hash: any;
  exe_hash: any;
  interval: any;
  constructor(
    private apiService: APIService) {
    this.usu_hash = this.getParamValueQueryString('usu_hash');
    this.exe_hash = this.getParamValueQueryString('exe_hash');
   }
  ngOnInit() {
    this.startTimer();
  }
  startTimer() {
    this.timer = 0;
    this.interval = setInterval(() => {
      this.timer++;
    }, 1000)
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
  sendResponse() { 
      const data = {
        exe_hash: this.exe_hash,
        usx_completado: true,
        token: this.usu_hash,
        tempo_exercicio: this.timer
      }
        this.apiService.sendResponse(data,data.token).then(res => {
        });
        Swal.fire({
          icon: 'success',
          title: 'Parabéns!',
          text: 'Você concluiu o módulo de estudos!',
      })
  }
}
     


