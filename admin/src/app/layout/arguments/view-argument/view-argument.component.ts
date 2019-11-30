import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ArgumentService } from 'src/app/service/argument.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-argument',
  templateUrl: './view-argument.component.html',
  styleUrls: ['./view-argument.component.scss'],
  animations: [routerTransition()]
})
export class ViewArgumentComponent implements OnInit {
  argument_id: any;
  argument: any;
  premisses: any[];

  constructor(private route: ActivatedRoute, private argumentService: ArgumentService) {
    this.argument_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getArgument();
  }

  getArgument() {
    this.argumentService.getArgument(this.argument_id).then((result: any) => {
      if (!result.error) {
        this.argument = result.data;
        this.premisses = this.argument.ArgumentPremises;
        console.log(this.argument);
      }
    });
  }
  deletePremise(premise_id: string) {
    if (premise_id != null) {
      Swal.fire({
        title: 'Deseja excluir este item?',
        text: "Esta ação  não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!'
      }).then((result) => {
        if (result.value) {
          this.argumentService.deletePremise(premise_id).then((result: any) => {
          Swal.fire(
            'Sucesso!',
            'Exclusão realizada com êxito.',
            'success'
          )
          this.getArgument();
        }
      )
    }else{
      err => console.error(err);      
    }
  }); 
  }  
  }
}
