console.log("I am a node doc.")

var Twitter = require("twitter")
var config = require("./config")
var client = new Twitter(config);
var d3 = require("d3")
var http = require("http")

/// CUSTOM SEARCH: TOP 10 TWEETS ABOUT RUSSIA 

// Search for tweets that include Russia, in english, most popular, filtering out retweets and replies.

var param5 = {q: "Futbol -filter:retweets -filter:replies", lang: "en", result_type: "popular", count: 10}
client.get('search/tweets',param5,function(error,tweets,response){
	
	var results = []

	tweets.statuses.forEach(function(d){
			var date = new Date(d.created_at); 
			var day = date.getDate();
			var year = date.getFullYear();
			var month = date.getMonth()
			var retweets = d.retweet_count;

			results.push({
				"user": d.user.screen_name,
				"URL" : `https://twitter.com/${d.user.screen_name}/status/${d.id_str}`,
				"retweets": d.retweet_count,
				"text": d.text,
				"time": `(${month+1}-${day}-${year})`
			})
		results.sort(function(a,b){
			return b.retweets - a.retweets;
		})

		console.log("\n\n\nTHESE ARE THE RESULTS:\n\n\n", results)
	})
})
/*


// STREAMING API REQUESTS
 param4 =  {track: 'Red Sox OR red sox OR sox'}
client.stream('statuses/filter',param4,function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});*/