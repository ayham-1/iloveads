const socket = new WebSocket('ws://localhost:61434');

function handle_blocked_url(requestDetails) {
	console.log(`blocked: ${requestDetails.url}`);
	browser.storage.local.get('checkboxState', function(result) {
		if (result.checkboxState)
			socket.send(requestDetails.url);
	});
}

browser.webRequest.onErrorOccurred.addListener(handle_blocked_url, {
	urls: ["<all_urls>"],
});

socket.addEventListener('open', function (event) {
	console.log("Connected to the iloveads WebSocket server");
	socket.send("ping: hello world connected");
});

socket.addEventListener('close', function (event) {
	console.log('Disconnected from the iloveads WebSocket server');
});

socket.addEventListener('error', function (error) {
	console.error('WebSocket error: ', error);
});
