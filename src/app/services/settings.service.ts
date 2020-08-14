import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || `./assets/css/colors/dark-purple.css`;
    // pone en document el url en href
    this.linkTheme.setAttribute("href", url);
  }


  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    // console.log(url);
    this.linkTheme.setAttribute("href", url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    // console.log(links);
    links.forEach(elem => {

      //limpia las palomitas working
      elem.classList.remove('working');

      //obtiene del dom el data-teme para rear la url y compararla con la que esta actualmente
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      //tema actual
      const currentTheme = this.linkTheme.getAttribute('href');
      //si el del document coincide con el seleccionado ya, Agrega Palomita
      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }

    });

  }

}
