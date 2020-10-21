import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from "../services/usuario.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
          isAutenticated => {
            // Si no esta autenticado lo saca
            if (!isAutenticated) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );

  }

}
