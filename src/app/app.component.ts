/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.scss'
  ],
  template: `
    <div class="btn-group btn-group-justified" role="group">
      <a [routerLink]="['./inbound']" [routerLinkActive]="['active']" role="button" class="btn">Inbound</a>
      <a [routerLink]="['./']" [routerLinkActive]="['active']" role="button" class="btn active">Outbound</a>
    </div>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  loading: Boolean = false;

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
