var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
	/*var request = JSON.parse(this.req.chunks[0]),
		botRegex = /^\*factoid$/;*/

	var request = JSON.parse(this.req.chunks[0]);
	var botRegex = /^\*factoid$/;

	if( request.text && botRegex.include(request.text) ) {
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
		"Penguins can fly, but usually don't because their wings will freeze if they do.",
		"Humans can survive underwater, but not for very long.",
		"No United States president has had divorced parents.",
		"Bees and zebras both have stripes because they share a common ancestor.",
		"Jesus was left-handed",
		"If you stand on the north pole or the south pole, you will be time traveling.",
		"KFC opened 8 months before buffalos were declared an endangered species.",
		"Tornadoes can't travel downhill.",
		"I am the Factoid Bot, I tell random facts.",
		"Birds can land safely on powerlines since their feet are made of rubber.",
		"All piglets are born with an identical twin.",
		"Cockroach venom are strong enough to hospitalize a small child, but their teeth cannot pierce through human skin.",
		"The Sun's core is composed of frozen hydrogen.",
		"All iPads made after the second generation can be used as a scale.",
		"A frog cannot jump backwards.",
		"It is not uncommon for herd of hippos to mistakenly contain a baby rhino. As the rhino grows up, it is expelled from the herd.",
		"Mammoths were alive when the Great Pyramids were being built.",
		"Anne Frank and Martin Luther King Jr. were born in the same year.",
		"Kangaroos can store water in its pouch for later consumption.",
		"Knots on a tree are tumors.",
		"In 1974, Professor Francis A. Boyle of the University of Illinois wrote a critically acclaimed work study on how coconuts because they consist of hair and produce milk. This was refuted 11 months later.",
		"No matter how fast you go, automatic doors will open in time.",
		"If you soak a raisin for long enough, it will eventually turn back into a grape.",
		"Antelopes can jump higher than houses. Houses can't jump.",
		"Goats can lay eggs.",
		"Elephants can easily hide in trees.",
		"Charlie Chaplin once entered a Charlie Chapin look-alike contest and lost.",
		"Terminal velocity for a cat is non-lethal.",
		"Pirates wore eye-patches so that when removed, they would be able to see better in the bottom deck of a ship.",
		"An octopus has 3 hearts.",
		"Crocodiles are more closely related to birds than they are to lizards.",
		"An avocado is a berry, a strawberry is not."
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

exports.respond = respond;