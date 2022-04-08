import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  id:any;
  usuarios:any[]=[];
  user:any='';

  constructor(
    private activatedRoute:ActivatedRoute,
    public _usuario:UsersService
    ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this._usuario.loading = true;
  }

  ngOnInit(): void {
    this._usuario.getUser(this.id).subscribe((res:any)=>
      {
        this.user = res.data
        this._usuario.loading = false;
        //console.log(this.user)
      }
      //console.log(res)
      )
  }

}
