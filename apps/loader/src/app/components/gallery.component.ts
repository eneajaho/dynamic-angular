import { BlockData, DynData } from '@dynamica/config';
import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dyn-gallery',
  template: `
    <h4>Gallery</h4>

    <div *ngIf="data.items as items" class="items">
      <div *ngFor="let item of items" class="item">
        <img [src]="item.previewImageUrl" [alt]="item.title" />
        <h4>{{ item.title }}</h4>
      </div>
    </div>
  `,
  styles: [
    `
      .items {
        display: grid;
        grid-template-columns: repeat(3, minmax(200px, 1fr));
        align-items: center;
        justify-items: center;
      }

      .item {
        img {
          width: 200px;
          height: 200px;
          object-fit: cover;
        }
      }
    `,
  ],
})
export default class DynGalleryComponent {
  constructor(@Inject(DynData) public data: BlockData) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [DynGalleryComponent],
})
export class DynGalleryComponentModule {}
