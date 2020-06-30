import {NgModule} from "@angular/core";

import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
  imports: [
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }
