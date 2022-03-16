import { ROUTES_CONFIG } from '@dynamica/config';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetch('/routes-config.json')
  .then((res) => res.json())
  .then((routes) => {
    console.log({ routes });
    platformBrowserDynamic([{ provide: ROUTES_CONFIG, useValue: routes }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error("Couldn't load routes data!", err));
