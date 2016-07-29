
/**
 * get stops for a specifc bus (we do not care about inbound/outbound)
 * @usage
 * node get_stops.js 93
 * yields stop id and display_name for all stops on the 93 bus
 */
var request = require('request');
var JSONStream = require('JSONStream');
var chalk = require('chalk');
var es = require('event-stream');
var apiKey = 'wX9NwuHnZU2ToO7GmGR9uw';
// var u = 'http://proximobus.appspot.com/agencies/mbta/routes/' + process.argv[2] + '/stops.json';
var u = 'http://realtime.mbta.com/developer/api/v2/stopsbyroute?route=' + process.argv[2] + '&api_key=' + apiKey + '&format=json';

console.log(u);

j = request({url: u})
  .pipe(JSONStream.parse())
  .pipe(es.mapSync(function (data) {
    data.direction[0].stop.forEach(function(r){
      if(r.stop_id !== undefined){
      }
      console.log(chalk.blue(r.stop_id) + ": " + r.stop_name);
    });
  })
);



// direction = 1 //inbound
// http://realtime.mbta.com/developer/api/v2/schedulebystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop=North%20Station&route=CR-Haverhill&direction=0&format=json