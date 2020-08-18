import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {subscribeTo} from "rxjs/internal-compatibility";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string;
  public tituloSibs$: Subscription;

  constructor(private  router: Router, private activatedRoute:ActivatedRoute) {
    this.tituloSibs$ = this.getArgumentosRuta()
      .subscribe(({titulo}) => {
        this.titulo = titulo;   //titulo en html
        document.title = `AdminPro - ${titulo}`; // titulo en el browser
      });
   // console.log(route.snapshot.children[0].data);
  }


  private getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
    //.subscribe( (data)=>this.titulo = data.titulo)
    // usando destructuracion queda asi:->
    //.subscribe( ({titulo})=>this.titulo = titulo);

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tituloSibs$.unsubscribe();
  }

}
