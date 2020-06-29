import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { SidebarMenuService } from './sidebar-menu.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SidenavMenu } from './sidebar-menu.model';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavMenu;
  @Input() depth: number;
  @Output() closed = new EventEmitter();

  constructor(
    private sidenavMenuService: SidebarMenuService,
    public router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    if (this.depth === undefined) {
      this.depth = 0;
    }

    this.matIconRegistry.addSvgIcon(
      "alimento-perro",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-pata-perro.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "alimento-gato",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-pata-gato.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "sanitario-gato",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-pata-gato.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "antipulgas",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/anti-pulga.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "snacks",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/snack.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "accesorios",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-accesorios.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "productos-en-promocion",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-promociones.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "animal-planet-sale",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/ico-promociones.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "casitas",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../../assets/images/casitas.svg")
    );
  }

  ngOnInit() {
    this.sidenavMenuService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }


  onItemSelected(item: SidenavMenu) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.closed.emit(true)

    }
    if (item.children && item.children.length) {
      console.log("click okkk");
      this.ariaExpanded = !this.expanded;

    }
  }

}
