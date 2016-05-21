var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
	var request = JSON.parse(this.req.chunks[0]),
		botRegex = /^\/factoid$/;

	if(request.text && botRegex.test(request.text)) {
	this.res.writeHead(200);
	postMessage();
	this.res.end();
	} else {
	console.log("don't care");
	this.res.writeHead(200);
	this.res.end();
	}
}

function postMessage() {
	var botResponse, options, body, botReq;

	var factoids = [
		"Mao Zedong had the largest recorded porn collection in history.",
		"Factoids are random facts.",
		"Police sirens are red and blue so that they don't have an affiliation with the Bloods or the Crips.",
		"Nowhere on a can of Campbell's Tomato Soup does the word 'soup' appear.",
		"Pengiuns can fly, but refuse to do so because their wings will freeze if they do.",
		"Humans can survive underwater, but not for very long.",
		"No United States president has had divorced parents.",
		"Bees and zebras both have stripes because they share a common ancestor.",
		"Jesus was left-handed",
		"If you stand on the north pole or the south pole, you will be time traveling.",
		"KFC opened 8 months before buffalos were declared an endangered species." ,
		"Tornadoes can't travel downhill."
	];

	var num = factoids.length - 1;
	seed = getRandomInt(0, num);
	botResponse = factoids[seed];

	options = {
	hostname: 'api.groupme.com',
	path: '/v3/bots/post',
	method: 'POST'
	};

	body = {
	"bot_id" : botID,
	"text" : botResponse
	};

	console.log('sending ' + botResponse + ' to ' + botID);

	botReq = HTTPS.request(options, function(res) {
		if(res.statusCode == 202) {
		//neat
		} else {
		console.log('rejecting bad status code ' + res.statusCode);
		}
	});

	botReq.on('error', function(err) {
	console.log('error posting message '  + JSON.stringify(err));
	});
	botReq.on('timeout', function(err) {
	console.log('timeout posting message '  + JSON.stringify(err));
	});
	botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*function getFactoid() {

	var response = "test string"; // string to hold.
	var in_file = new File("factoids.txt");

	// Get line count
	var count = 0;
	in_file.open("r");
	while(!in_file.eof) {
		in_file.readln();
		count++;
	}
	in_file.close();

	// Get a random line number:
	var d = new Date();
	var n = d.getTime();
	var seed = n % count;

	// Gets a random string from text file:
	in_file.open("r");
	var temp = 0;
	while(!in_file.eof){
		
		if(temp==count){
			response = in_file.readln();
		} else{
			in_file.readln();
		}

		temp++;
	}

	in_file.close;
	return response;

}*/

exports.respond = respond;