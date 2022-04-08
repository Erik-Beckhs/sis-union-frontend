import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public users:any[]=[]
  loading:boolean = true

  constructor(
    //private _users:UsersService
    ) { }

  ngOnInit(): void {
    // this._users.getUsers().subscribe((res:any)=>{
    //   this.users = res.data
    //   //console.log(this.users)
    //   this._users.loading = false;
    // })
  }

  view(id:any){
    console.log(id);
  }
}
