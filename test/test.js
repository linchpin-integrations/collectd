var assert = require("chai").assert; // node.js core module
var getenv = require('getenv');

describe('stripe',function(){

    var seneca = require('seneca')();
    seneca.use('..');

    describe('process_hook',function(){
        it('should process collectd events',function(done){
            var req =  {lpi:'collectd', cmd:'process_hook', config:{name:"test"}, env:{post:[{"values":[0.016666702785504],
                "dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin",
                "type":"mysql_commands","type_instance":"admin_commands"},{"values":[0],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,
                "host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands","type_instance":"alter_table"},{"values":[0],"dstypes":["derive"],
                "dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands",
                "type_instance":"begin"},{"values":[0],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql",
                "plugin_instance":"linchpin","type":"mysql_commands","type_instance":"change_db"},{"values":[0],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,
                "host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands","type_instance":"commit"},{"values":[0],"dstypes":["derive"],"dsnames":["value"],
                "time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands","type_instance":"create_db"},
                {"values":[0],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin",
                    "type":"mysql_commands","type_instance":"create_table"},{"values":[0],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,
                    "host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands","type_instance":"create_user"},{"values":[0],"dstypes":["derive"],
                    "dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands",
                    "type_instance":"delete"}]}};

            seneca.act(req, function(err,result){
                console.log( '%j', result );
                assert.isArray(result,'result is an Array');
                done();
            });
        })
    });

    describe('about',function(){
        it('should return integration properties',function(done){
            seneca.act( {lpi:'collectd', cmd:'about'}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                assert.equal(result.name,'collectd','name is collectd');
                done();
            });
        })
    });


    describe('list',function(){
        it('should return a command\'s json schema',function(done){
            seneca.act({lpi:'collectd',cmd:'list'}, function(err,list){
                console.log('%j',list);
                assert.isObject(list,'list is object');
                done();
            });
        });
    });
});
