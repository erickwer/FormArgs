import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ArgumentService } from 'src/app/service/argument.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './arguments.component.html',
  styleUrls: ['./arguments.component.scss'],
  animations: [routerTransition()]
})
export class ArgumentsComponent implements OnInit {
  arguments: any[];

  constructor(private argumentService: ArgumentService) { }

  ngOnInit() {
    this.getAllArguments();
  }

  getAllArguments() {
    this.argumentService.getAll().then((result: any) => {
      if (!result.error) {
        this.arguments = result.data;
      }
    });
  }
  deleteArgument(argument_id: string) {
    if (argument_id != null) {
      Swal.fire({
        title: 'Deseja excluir este item?',
        text: "O argumento será excluído. Esta ação não pode ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!'
      }).then((result) => {
        if (result.value) {
          this.argumentService.deleteAgument(argument_id).then((result: any) => {
            if(!result.error){
          Swal.fire(
            'Sucesso!',
            'Exclusão realizada com êxito.',
            'success'
          )
          this.getAllArguments();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você deve excluir primeiramente as premissas e a conclusão associadas a este argumento!',   
          })
        }
        
      }
        )
    }else{
      err => console.error(err);      
    }} 
  )};  
  }
}
