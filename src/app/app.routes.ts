import { RouterConfig } from '@angular/router';
import { Outbound } from './outbound';
import { Inbound } from './inbound';
import { NoContent } from './no-content';

export const routes: RouterConfig = [
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes

  { path: '',         component: Outbound },
  { path: 'outbound', component: Outbound },
  { path: 'inbound',  component: Inbound },
  { path: '**',       component: NoContent },
];

// asyncRoutes is needed for our webpack-toolkit to allow us to resolve the component correctly
export const asyncRoutes = {
  // 'About': require('es6-promise-loader!./about')
};
