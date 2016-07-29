import { Component } from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { AppState } from '../app.service';
import { Trains } from '../common/trains.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'outbound',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    JSONP_PROVIDERS, Trains
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  // directives: [
  //   XLarge
  // ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './outbound.style.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './outbound.template.html'
})

export class Outbound {
  trainTrips = [];
  busTrips = [];

  constructor(public appState: AppState, public trains: Trains) {
    //
  }

  ngOnInit() {
    this.trains.getOutboundTrain('CR-Haverhill').subscribe(res => {
      this.trainTrips = res;
    });

    this.trains.getOutboundBus('131,136,137').subscribe(res => {
      this.busTrips = res;
    });

  }
}
