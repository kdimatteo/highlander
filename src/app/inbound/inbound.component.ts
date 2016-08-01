import { Component } from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { AppState } from '../app.service';
import { Trains } from '../common/trains.service';

import { LocalStorageService } from 'ng2-webstorage';

@Component({
  selector: 'inbound',  // <home></home>
  providers: [
    JSONP_PROVIDERS, Trains, LocalStorageService
  ],
  pipes: [ ],
  styleUrls: [ './inbound.style.scss' ],
  templateUrl: './inbound.template.html'
})

export class Inbound {
  trips = [];
  stopName = '';
  stops = ['Melrose Cedar Park', 'Melrose Highlands'];

  constructor(public appState: AppState, private trains: Trains, private storage: LocalStorageService) { }

  ngOnInit() {
    this.stopName = this.storage.retrieve('preferredStop') || 'Melrose Highlands';
    this.fetch(); 
  }

  private fetch() {
    this.trains.getInbound(this.stopName).subscribe(res => {
      this.trips = res;
    });
  }

  private onChange(e: any) {
    this.stopName = e.target.checked ? this.stops[1] : this.stops[0];
    this.storage.store('preferredStop', this.stopName);
    this.fetch();
  }

  private getIcon(): string {
    return this.isActive() ? 'icon-crown' : 'icon-forest';
  }

  private isActive(): boolean {
    return this.stopName === this.stops[1];
  }

  private getMode(): string {
    return this.isActive() ? 'Highlander' : 'Cedar Park';
  }

}
