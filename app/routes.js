var Twit = require('twit');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	app.get('/api/tweets', function(req, res) {
		var T = new Twit({
		  consumer_key:         'rWwt9hfKTHMdtDuSKM3HlQQes',
		  consumer_secret:      'OMvhBmqmp65UlzPbAUe7n6zLX4cETgNmLTfiz0amHvu0NkzuN9',
		  access_token:         '1428205782-BNPCmdDQrxWehCxOtqVCO6WjUEGLI44nulgAsqO',
		  access_token_secret:  'DwY4XtSlRRW42e7yGKxm8frLyHbrZUYHQTFioZX1kGt3b',
		});
		T.get('statuses/user_timeline', { screen_name: 'ericsmith1302', count: 100, exclude_replies: true }, function(err, data, response) {
			var newFormat = [];
			for (var i = 0; i < data.length; i++) {
				var tweet = data[i];
				var text = tweet['text'];
				var userObj = tweet['user'];
				var entitiesObj = tweet['entities'];
				var mentions = entitiesObj['user_mentions'];
				var username = userObj['screen_name'];
				newFormat.push({
					text: text,
					username: username,
					mentions: mentions
				});
			}
	  		res.jsonp(newFormat);
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};