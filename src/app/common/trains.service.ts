import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class Trains {

  constructor(public jsonp: Jsonp) {}

  public getInbound(stopName: string): any {
    let baseUrl = 'http://realtime.mbta.com/developer/api/v2/schedulebystop';
    
    let params = new URLSearchParams();
    params.set('api_key', 'wX9NwuHnZU2ToO7GmGR9uw');
    params.set('format', 'jsonp');
    params.set('jsonpcallback', 'JSONP_CALLBACK');
    params.set('route', 'CR-Haverhill');
    params.set('stop', stopName);
    params.set('max_trips', '6');
    params.set('max_time', '1440');

    return this.jsonp.get(baseUrl, {search: params}).map(req => req.json().mode[0].route[0].direction[1].trip);
  }

  public getOutboundTrain(route: string): any {
    let baseUrl = 'http://realtime.mbta.com/developer/api/v2/schedulebyroutes';
    
    let params = new URLSearchParams();
    params.set('api_key', 'wX9NwuHnZU2ToO7GmGR9uw');
    params.set('format', 'jsonp');
    params.set('jsonpcallback', 'JSONP_CALLBACK');
    params.set('routes', route);
    params.set('max_trips', '6');
    params.set('max_time', '1440');

    return this.jsonp.get(baseUrl, {search: params}).map((req) => {
      let data = req.json();
      let rawOutbound = data.mode[0].route[0].direction[0].trip;
      return rawOutbound.filter(this.filterByStop);
     });
  }


  public getOutboundBus(route: string): any {
    let baseUrl = 'http://realtime.mbta.com/developer/api/v2/schedulebyroutes';
    
    let params = new URLSearchParams();
    params.set('api_key', 'wX9NwuHnZU2ToO7GmGR9uw');
    params.set('format', 'jsonp');
    params.set('jsonpcallback', 'JSONP_CALLBACK');
    params.set('routes', route);
    params.set('max_trips', '5');
    params.set('max_time', '1440'); 

    return this.jsonp.get(baseUrl, {search: params}).map((req) => {
      let routes = req.json().mode[0].route;
      let data = [];

      for (let route of routes){
        for(let trip of route.direction[0].trip){
          data.push({
            'route': route.route_id,
            'startTime': trip.stop[0].sch_dep_dt,
            'startLocation': trip.stop[0].stop_name.replace(/ - Orange Line/g, '')
          });
        }
      }
      return data.sort((a, b) => a.startTime - b.startTime);
    });
  }

  private filterByStop(trip): boolean {
    let containsMyStop;
    for (let stop of trip.stop){
      containsMyStop = false;
      for (let stop of trip.stop){
        if(stop.stop_name == "Melrose Highlands"){
          containsMyStop = true;
        }
      }
    }
    return containsMyStop;
  }

}
