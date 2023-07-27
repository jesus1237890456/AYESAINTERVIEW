import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor() { }

  @Input() isCollapsed: boolean = false;
// metodo que cambia el colapso a true o a false y lo recibe del app.ts
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {

  }

}
