import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../services/settings.service";

// Funcion global en custom.ini
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',

})
export class PagesComponent implements OnInit {

  constructor(private settingsService:SettingsService) {
  }

  ngOnInit(): void {
    customInitFunctions();
  }

}
