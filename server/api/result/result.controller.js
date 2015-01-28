'use strict';

var _ = require('lodash');
var Result = require('./result.model');
var moment = require('moment');
// Get list of results
exports.index = function(req, res) {
  Result.find().exec(function (err, results) {
    if(err) { return handleError(res, err); }
    return res.json(200, results);
  });
};

// Get a single result
exports.show = function(req, res) {
  Result.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.send(404); }
    return res.json(result);
  });
};

// Creates a new result in the DB.
exports.create = function(req, res) {
  Result.create(req.body, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.json(201, result);
  });
};

// Updates an existing result in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Result.findById(req.params.id, function (err, result) {
    if (err) { return handleError(res, err); }
    if(!result) { return res.send(404); }
    var updated = _.merge(result, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, result);
    });
  });
};

// Deletes a result from the DB.
exports.destroy = function(req, res) {
  Result.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.send(404); }
    result.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.sid = function(req, res) {
  Result.find({sid: req.params.sid}, function (err, results) {
    if(err) { return handleError(res, err); }
    return res.json(200, results);
  });
}

exports.uid = function(req, res) {
  Result.find({uid: req.params.uid}, function (err, results) {
    if(err) { return handleError(res, err); }
    return res.json(200, results);
  });
}

exports.sids = function(req, res) {
  var sids =[];
  Result.find(function(err, results) {
    sids = _.map(results, function(r) {
      return r.sid;
    });
    return res.json(200, _.uniq(sids));
  });

}

exports.csv = function(req, res) {
  Result.find({sid: req.params.sid}).exec(function (err, results) {
    if(err) { return handleError(res, err); }
    var clicks = _.map(results, function(elem) {
      return elem.clicks.length
    });
    var maxClicks = _.max(clicks);
    var returnobj = [];
    results = _.each(results, function(r) {
      r.clicks.length = maxClicks;
      var obj = {
        uid: r.uid || "",
        sid: r.sid || "",
        cid: r.cid || "",
        viewType: r.viewType,
        objectType: r.objectType,
        responseName:	r.response.choice,
        responserating:	r.response.rating,
        ResponseCategory: r.response.category,
        starttime: moment(r.starttime).format('MM-DD-YYYY hh:mm:ss:SS'),
        endtime: moment(r.updated).format('MM-DD-YYYY hh:mm:ss:SS'),
      };
      for (var i = 0; i < maxClicks; i++) {
        obj['clickname_' + i] = r.clicks[i] ? r.clicks[i].click : '';
        obj['clickdate_' + i] = r.clicks[i] ? moment(r.clicks[i].date).format('MM-DD-YYYY hh:mm:ss:SS') : '';
      }
      for (var i = 0; i < r.ratings.length; i++) {
        obj['randomratingname_' + i] = r.ratings[i].name;
        obj['randomratingrating_' + i] = r.ratings[i].rating;
      }
      returnobj.push(obj);
    });

    return res.json(200, returnobj);
  });
}

exports.selection = function(req, res){
  Result.find({uid: req.params.uid, sid: req.params.sid, cid: req.params.cid}).exec(function (err, results) {
    if(err) { return handleError(res, err); }
    if(results.length >= 1) {
      var r = results[0];
      var clicklist = '';
      var obj = {
        _uid: r.uid || "",
        _sid: r.sid || "",
        _cid: r.cid || "",
        _viewType: r.viewType,
        _objectType: r.objectType,
        _responseName:	r.response.choice,
        _responserating:	r.response.rating,
        _ResponseCategory: r.response.category,
        _starttime: moment(r.starttime).format('MM-DD-YYYY hh:mm:ss:SS'),
        _endtime: moment(r.updated).format('MM-DD-YYYY hh:mm:ss:SS')
      };
      for (var i = 0; i < r.clicks.length; i++) {
        clicklist += r.clicks[i].click + ' : ' + moment(r.clicks[i].date).format('MM-DD-YYYY hh:mm:ss:SS') + ' , ';
      }
      obj._clicks = clicklist;
      for (var i = 0; i < r.ratings.length; i++) {
        obj['_randomratingname_' + i] = r.ratings[i].name;
        obj['_randomratingrating_' + i] = r.ratings[i].rating;
      }
      return res.json(200, obj);
    }
    else{
      return res.json(200, {});
    }
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
