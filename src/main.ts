import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { inject } from '@vercel/analytics';
import { environment } from "./environments/environment";
import { enableProdMode } from "@angular/core";

if (environment.production) {
  enableProdMode();
}

// Initialize Vercel Analytics
inject();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
