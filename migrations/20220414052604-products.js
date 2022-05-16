'use strict';

var database;
var type1;
var seed1;
var fs = require('fs');
var path = require('path');
var Promise_1;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) 
{
  database = options.dbmigrate;
  type1 = database.dataType;
  seed1 = seedLink;
  Promise_1 = options.Promise;
};

exports.up = function(db) 
{
  var filePath = path.join(__dirname, 'sqls', '20220414052604-products-up.sql');
  return new Promise( function( resolve, reject ) 
  {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data)
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

exports.down = function(db) 
{
  var filePath = path.join(__dirname, 'sqls', '20220414052604-products-down.sql');
  return new Promise( function( resolve, reject ) 
  {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data)
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
