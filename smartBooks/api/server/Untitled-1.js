const qs = require("querystring");
const http = require("https");

const options = {
	"method": "POST",
	"hostname": "google-translate1.p.rapidapi.com",
	"port": null,
	"path": "/language/translate/v2",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"accept-encoding": "application/gzip",
		"x-rapidapi-key": "c844f30273mshfe5aae25dc91c7cp1f03eajsn7f916a3de507",
		"x-rapidapi-host": "google-translate1.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
        const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(qs.stringify({q: 'Hello, world!', source: 'en', target: 'tr'}));
req.end();