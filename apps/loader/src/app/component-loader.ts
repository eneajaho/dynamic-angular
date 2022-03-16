import { Component, Inject, Injector, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Block, DynData, RoutesConfig, ROUTES_CONFIG } from '@dynamica/config';

@Component({
  selector: 'dyn-component-loader',
  template: `
      <ng-container *ngIf="widgets">
        <div *ngFor="let widget of widgets" >
          <ng-container *ngIf="widget.component | async as cmp; else loadingCmp">
            <ng-container
              [ngComponentOutlet]="cmp.default"
              [ngComponentOutletInjector]="widget.dataInjector">
            </ng-container>
          </ng-container>
          <ng-template #loadingCmp>
            <div class="flex-center"
                 style="min-height: 400px; background: #329c9c24; border-radius: 10px;">
              <div class="spinner-grow" role="status">
                <span class="sr-only">Loading component...</span>
              </div>
            </div>
          </ng-template>
        </div>
      </ng-container>
  `,
})
export class ComponentLoader implements OnInit {
  constructor(
    @Inject(ROUTES_CONFIG)
    public routesConfig: RoutesConfig,
    private activatedRoute: ActivatedRoute,
    private injector: Injector
  ) {}

  widgets: { dataInjector: Injector, component: Promise<{ default: Type<unknown> }>}[] = [];

  ngOnInit() {
    console.log('Hello from component loader');
    console.log(this.activatedRoute);

    this.activatedRoute.data.subscribe((data: Data): void => {
      console.log("Route data", data);

      const blocks = data[ 'blocks' ] as Block[];

      for (const block of blocks) {
        const widget = {
          dataInjector: this.createInjector(block.data),
          component: createComponentImport(block[ 'type' ])
        };
        this.widgets.push(widget);
      }
    });
  }

  createInjector(data: unknown): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [{
        provide: DynData,
        useValue: data
      }]
    });
  }
}

export const SLUG_PREVIEW: { [key: string]: string } = {
  'header-menu': 'header-menu',
  'gallery': 'gallery',
  'login-form': 'login-form',
}

// create component import based on type
export function createComponentImport(type: string): Promise<{ default: Type<unknown> }> {
  // this should be added to enable prefetching
  return import(
    /* webpackPrefetch: true */
    `./components/${ SLUG_PREVIEW[type] }.component`
    ) as Promise<{ default: Type<unknown> }>;
}