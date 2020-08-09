import {Component, Input, OnInit} from '@angular/core';
import {Color, Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

  @Input() titulo: string = "Sin Titulo";

  @Input('labels') doughnutChartLabels: Label[]  = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: MultiDataSet[] ;

  // public doughnutChartLabels: Label[] = this.labels;
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100]
  // ];

  colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  // events

  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
