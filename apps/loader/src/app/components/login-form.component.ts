import { BlockData, DynData } from '@dynamica/config';
import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Component({
  selector: 'dyn-gallery',
  template: `
    <h3>Login form</h3>

    <form #form="ngForm" (ngSubmit)="handleSubmit(form.value)">
      <label>
        Username
        <input type="text" ngModel name="username" placeholder="username" />
      </label>

      <label>
        Password
        <input type="password" ngModel name="password" placeholder="password" />
      </label>

      <button>Login</button>
    </form>
  `,
  styles: [
    `
      h3 {
        text-align: center;
      }

      input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
      }

      button {
        width: 100%;
        height: 40px;
        border: none;
        font-size: 18px;
      }
    `,
  ],
})
export default class DynGalleryComponent {
  constructor(@Inject(DynData) public data: BlockData, private http: HttpClient) {}

  handleSubmit(payload: any): void {
    console.log(payload, this.data);

    this.http.post(this.data[ 'authApi' ], payload).pipe(take(1)).subscribe(res => {
      console.log('Request was sent!');
    })
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DynGalleryComponent],
})
export class DynGalleryComponentModule {}
