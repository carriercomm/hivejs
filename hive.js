// Hive.js
// Init process for idiots
// Author: Teemu Heikkilä <teemu.heikkila@emblica.org>
 
 
var sys = require('sys');
var spawn = require('child_process').spawn;
var async = require('async');
 
// Processes to start
var processes = [
        {name:"redis", command:"/usr/bin/redis-server", args:[], child:0},
        {name:"sshd", command:"/usr/sbin/sshd", args:["-D"], child:0},
        {name:"airfield", command:"/usr/bin/node", args:["/root/airfield/airfield.js"], child:0},
];
 
async.each(processes, function(p, cb){
       
        p.child = spawn(p.command, p.args);
       
        p.child.stdout.on('data', function(data){
                console.log(p.name+':stdout:'+data);
        });
 
        p.child.stderr.on('data', function(data){
                console.log(p.name+':stderr:'+data);
        });
 
        p.child.on('close', function(code){
                console.log(p.name+' exited with code '+code);
        });
        cb();
}, function(err){
        if (err) {
                console.log(err);
        };
        console.log("Processes started!");
});
