import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import {UsuarioService} from "../services/usuario.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // valida que el usuario este autenticado y sino lo saca al login
    return this.usuarioService.validarToken()
      .pipe(
        tap(
          estaAutenticado => {
            // Si no esta autenticado lo saca
            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );

  }

  // @ts-ignore
  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado =>  {
          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
