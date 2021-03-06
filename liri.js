var a = process.argv;
var twitterKey = require('./key.js').twitterKeys;
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs =require('fs');
var expression =a[2];
var value= a[3];
var songName='';
var songNameArray=[];
var logInput='';

//getting twitter keys from key.js
var client = new Twitter({
  consumer_key:twitterKey.consumer_key,
  consumer_secret: twitterKey.consumer_secret,
  access_token_key: twitterKey.access_token_key,
  access_token_secret: twitterKey.access_token_secret
  
});

//function to get tweets
function myTweets(){
	var params = {user_id: 'raji3324',count:20
				 };						

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
		  	console.log("------my tweets------");
		  	tweets.forEach(function(item,index){
		  		console.log("tweet"+index+": "+tweets[index].text);
		  		logInput += tweets[index].text+'\n';

		  	})
		  	write(logInput);

	  	}
	});
}

//function to get song deatails from spotify
function songDetails(songName){
    spotify.search({ type: 'track' , query: songName}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }else{
            	var trackArray = data.tracks.items;
            	trackArray.forEach(function(item,index){
                    console.log("-------------"+trackArray[index].name+" Details----------------------");
            		console.log("Album Name: "+trackArray[index].album.name);
            		console.log("Track Name: "+ trackArray[index].name);
            		console.log("Artist Name: "+trackArray[index].artists[0].name);
            		console.log("Preview Url: "+trackArray[index].preview_url);
            		console.log("-----------------------------------");
            		logInput += "Album Name: "+trackArray[index].album.name+'\n';
            		logInput += "Track Name: "+ trackArray[index].name+'\n';
            		logInput += "Artist Name: "+trackArray[index].artists[0].name+'\n';
            		logInput += "Preview Url: "+trackArray[index].preview_url+'\n';

                   });    
                   write(logInput);             
             }	        
    });	        
 	
}

//function to get song deatails from spotify
function spotifyMySongs(value) {
    
	if(value === undefined) {
	   //"https://api.spotify.com/v1/search?query=track%3Athe+sign+artist%3AAce+of+Base&offset=0&limit=1&type=track",
	    songName='track:the+sign+artist:Ace+of+Base&offset=0&limit=1'
	   // console.log('songName'+songName);
	    songDetails(songName);	    

	} else { 
	    songName = value+'&limit=1';
	    songDetails(songName);
	}
}


function movieInfo(movieName){
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';


	// Then create a request to the queryUrl
	request(queryUrl,function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			// console.log(JSON.stringify(body, null, 2));
			console.log("**************  "+ JSON.parse(body).Title+" Details ******************")
			console.log("Title : "+JSON.parse(body).Title); 
			console.log("Year : "+JSON.parse(body).Year); 
			console.log("IMDB Rating : "+JSON.parse(body).imdbRating); 
			console.log("Country where the movie was produced : "+JSON.parse(body).Country); 
			console.log("Language : "+JSON.parse(body).Language); 
			console.log("Plot : "+JSON.parse(body).Plot); 
			console.log("Actors : "+JSON.parse(body).Actors); 
			console.log("Rotten Tomatoes Rating : "+JSON.parse(body).tomatoRating); 
			console.log("Rotten Tomatoes URL : "+JSON.parse(body).tomatoURL); 
			logInput += "Title : "+JSON.parse(body).Title+'\n';
			logInput += "Year : "+JSON.parse(body).Year+'\n';
			logInput += "IMDB Rating : "+JSON.parse(body).imdbRating+'\n';
			logInput += "Country where the movie was produced : "+JSON.parse(body).Country+'\n';
			logInput += "Language : "+JSON.parse(body).Language+'\n';
			logInput += "Plot : "+JSON.parse(body).Plot+'\n';
			logInput += "Actors : "+JSON.parse(body).Actors+'\n';
			logInput += "Actors : "+JSON.parse(body).Actors+'\n';
			logInput += "Rotten Tomatoes Rating : "+JSON.parse(body).tomatoRating+'\n';
			logInput += "Rotten Tomatoes URL : "+JSON.parse(body).tomatoURL+'\n';
		}
		write(logInput);
	});
	
}

//function to get movie details from IMDB node package
function movieThis(value) {
	var movieName="" ;

	if(value === undefined){
		movieName += "Mr.Nobody";
		//console.log('movieName'+movieName);
		movieInfo(movieName);
		console.log("****If you haven't watched Mr. Nobody,then you should: http://www.imdb.com/title/tt0485947/****");
		console.log("****It's on Netflix!****");

	}else{
		movieName = value;
		movieInfo(movieName);
	}

	// Then run a request to the OMDB API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';

	// This line is just to help us debug against the actual URL.  
	//console.log(queryUrl);

}

//function to read data from a text file and send that data into spotify query
function doWhatItSays(){
	//reading file
	fs.readFile("random.txt",{ encoding : 'utf8'},function(err,data){
		if(err){
			return comsole.log(err);
		} 
		 songNameArray=data.split(",");
		//console.log(songNameArray[1]);
		 sName =songNameArray[1]+'&limit=1';
		//console.log(sName);
		sDetails(sName);
	});
}

function sDetails(sName){
	
	//console.log("inside fun"+sName);
    spotify.search({ type: 'track' , query: sName}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }else{
        	var trackArray = data.tracks.items;
        	trackArray.forEach(function(item,index){
                console.log("***********************");
        		console.log("Album Name: "+trackArray[index].album.name);
        		console.log("Track Name: "+ trackArray[index].name);
        		console.log("Artist Name: "+trackArray[index].artists[0].name);
        		console.log("Preview Url: "+trackArray[index].preview_url);
        		console.log("-----------------------------------");
        		logInput += "Album Name: "+trackArray[index].album.name+'\n';
        		logInput += "Track Name: "+ trackArray[index].name+'\n';
             	logInput += "Artist Name: "+trackArray[index].artists[0].name+'\n';
        		logInput += "Preview Url: "+trackArray[index].preview_url+'\n';


            });
             write(logInput) ; 
                
        }

        
    });
        
}

function usageNotes() {
	console.log("please give valid input");
	console.log("use the following commands to get the information you want");
	console.log("node liri.js my-tweets ");
	console.log("node liri.js spotify-this-song '<song name here>' ");
	console.log("node liri.js movie-this '<movie name here> ");
	console.log("node liri.js do-what-it-says ");
	console.log("node liri.js help ");
}

// appending data into the text file
function write(item){
fs.appendFile('log.txt',"\n"+item,function(err){
	if(err){
		return console.log(err);

	}else{
		console.log("log.txt file created");
	}
})
}

switch(expression){
	case "my-tweets":
			myTweets();
			console.log("logInput"+logInput);
			break;
	case "spotify-this-song":
			spotifyMySongs(value);
			break;
	case  "movie-this":
			movieThis(value);
			break;
	case  "do-what-it-says":
			doWhatItSays();
			break;
	case  "help":
			usageNotes();
			break;
	default:
			usageNotes();
}

 
