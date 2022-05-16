'use strict';

var database;
var type1;
var seed1;
var fs_1 = require('fs');
var path_1 = require('path');
var Promise_1;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) 
{
  database = options.dbmigrate;
  type1 = dbm.dataType;
  seed1 = seedLink;
  Promise_1 = options.Promise;
};

exports.up = function(db) 
{
  var filePath = path_1.join(__dirname, 'sqls', '20220414052622-orders-up.sql');
  return new Promise( function( resolve, reject ) 
  {
    fs_1.readFile(filePath, {encoding: 'utf-8'}, function(err,data)
    {
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};

exports.down = function(db) 
{
  var filePath = path_1.join(__dirname, 'sqls', '20220414052622-orders-down.sql');
  return new Promise( function( resolve, reject ) 
  {
    fs_1.readFile(filePath, {encoding: 'utf-8'}, function(err,data)
    {
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  })
  .then(function(data) 
  {
    return db.runSql(data);
  });
};

exports._meta = 
{
  "version": 1
};
