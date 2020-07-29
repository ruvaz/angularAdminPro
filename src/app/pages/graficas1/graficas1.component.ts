import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styleUrls: ['./graficas1.component.css']
})
export class Graficas1Component implements OnInit {

  public label2:string[]  =['Guitarra','Piano','Violin'];
  public label3:string[]  =['Tacos','Hamburguesa','Pizza'];
  public data2 = [
    [30,18,7]
  ];
  public data3 = [
    [99,88,77]
  ];
  constructor() {
  }

  ngOnInit(): void {
  }


}
