import { RouterModule } from '@angular/router';
import { BlockData, DynData } from '@dynamica/config';
import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dyn-header-menu',
  template: `
    <ng-container *ngIf="data.links as links">
      <ul>
        <li *ngFor="let link of links">
          <a [routerLink]="[link.url]" routerLinkActive="active">
            {{ link.title }}
          </a>
        </li>
      </ul>
    </ng-container>
  `,
  styles: [
    `
      ul {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        a {
          text-decoration: none;
          font-family: sans-serif;
          color: blue;
          background: #55a2ff4f;
          padding: 10px 20px;
          border-radius: 5px;
        }
      }

      .active {
        background: blue !important;
        color: white !important;
      }
    `,
  ],
})
export default class DynHeaderMenuComponent {
  constructor(@Inject(DynData) public data: BlockData) {}
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DynHeaderMenuComponent],
})
export class DynHeaderMenuComponentModule {}
