var schemas = require('./commands');
var pjson = require('./package.json');
var _ = require('underscore');
var moment = require('moment');

var service = {
    "name": "collectd",
    "label": "CollectD",
    "description": "Get CollectD events. See docs for supported plugins.",
    "version": pjson.version,
    "private": true,
    "form_options": null,
    "is_oauth": false,
    "logo": "//linchpin-web-assets.s3.amazonaws.com/v1/integrations/collectd/logos/collectd.png",
    "server_integration": true,
    "frontend_integration": true,
    "webhook_commands":["process_hook"]
};

module.exports = function(options) {
    var lpis = this;

    options = lpis.util.deepextend({
    },options);

    lpis.add({lpi:'collectd',cmd:'about'},about);
    lpis.add({lpi:'collectd',cmd:'list'},list);
    lpis.add({lpi:'collectd',cmd:'process_hook'},process_hook);

    return {
        name:'collectd'
    };

    function about (args, done ){
        return done(null,service);
    }

    function list (args, done){
        return done(null, schemas);
    }

    function process_hook(args,done){
        var event = args.env.post;
        var list = [];

        /*
        Transform {"values":[3.93334181897621],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands","type_instance":"select"}
        Into LinchPin events, i.e.
        {value:3.93334181897621, ds_type: derive, interval: 60.0, host:"1642568916381235172", plugin:"mysql",plugin_instance:"linchpin","type":"mysql_commands","type_instance":"select",LinchPin:{CreatedTime:'ISOTIME'} }
         */

        if(_.isArray(event)){
            event.forEach(function(value){
                if(_.isArray(value['values'])){
                    value.values.forEach(function(v,i){
                        var event = {
                            value: value['values'][i],
                            ds_type: value['dstypes'][i],
                            name: value['dsnames'][i],
                            interval: value.interval,
                            host: value.host,
                            plugin: value.plugin,
                            plugin_instance: value.plugin_instance,
                            type: value.type,
                            type_instance: value.type_instance,
                            LinchPin:{
                                CreatedTime: moment.unix(value.time).utc().toISOString()
                            }
                        };
                        list.push(event);
                    });
                }
            });
        }

        done(null, list);
    }
};