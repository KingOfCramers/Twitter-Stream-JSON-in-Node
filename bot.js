console.log("I am a node doc.")

var Twitter = require("twitter")
var config = require("./config")

var client = new Twitter(config);
 

 /*client.get(path, params, callback);

 client.post(path, params, callback);
client.stream(path, params, callback);*/



// Your PATH is a preset query defined by the Twitter API.
// Such as here: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
// Or Here: https://developer.twitter.com/en/docs/tweets/filter-realtime/overview
// 
// 
// For GET requests, one common path is search/tweets. This allows you to receive tweet information.
// For STREAM requests, one parameter is statuses/filter, which allows you to stream live tweet data.
// 
// Your PARAMS are the information you're giving that request. It's telling it what to do/look for. It's an object w/ key value pairs.
// 
// For a search/tweets parameter in a GET request, the params might be {q: "Mangos", count: 5}.
// Full list of params for search/tweets here: https: //developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
// 
// 
// Your callback is what you do with the data once you've gotten it.



/// RESTING API GET REQUESTS


// 1. Search user's favorite list.

/* var param1 = {screen_name: 'harrisoncramer'};
client.get('statuses/user_timeline', param1, function(error, tweets, response) {
  if (!error) {
  	tweets.forEach(function(d){
		console.log(d.text)
  		return
  	})
  }
});*/


// 2. Search for tweets including a certain text

/*var param2 = {q: "Russia", count: 2}
client.get('search/tweets',param2,function(error,tweets,response){
	tweets.statuses.forEach(function(d){
		console.log(d.text)
	})
})*/


// 3. Search for tweets including either "Mango" or "gun" or "peach"

/*var param3 = {q: "mango OR gun OR peach", count: 100}
client.get('search/tweets',param3,function(error,tweets,response){
	tweets.statuses.forEach(function(d){
		console.log(d.text)
	})
})*/


// 4. Search for tweets from harrisoncramer
/*var param4 = {q: "from:harrisoncramer", count: 100}
client.get('search/tweets',param4,function(error,tweets,response){
	tweets.statuses.forEach(function(d){
		console.log(d.text)
	})
})*/



/// CUSTOM SEARCH: TOP 10 TWEETS ABOUT RUSSIA 

// 5. Search for tweets that include Russia, in english, most popular, filtering out retweets and replies.å
var param5 = {q: "Russia -filter:retweets -filter:replies", lang: "en", result_type: "popular", /*until: "2018-01-25",*/ count: 10}
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



// STREAMING API REQUESTS
/* param4 =  {track: 'Red Sox'}
client.stream('statuses/filter',param4,function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});*/