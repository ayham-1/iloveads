let socket;


function handle_blocked_url(requestDetails) {
	console.log(`blocked: ${requestDetails.url}`);
	browser.storage.local.get('checkboxState', function(result) {
		if (result.checkboxState)
			socket.send(`blocked: ${requestDetails.url}`);
	});
}

function create_socket() {
	socket = new WebSocket('ws://localhost:61434');
	socket.addEventListener('open', function (event) {
		console.log("Connected to the iloveads WebSocket server");
		socket.send("ping: hello world connected");
	});
	
	socket.addEventListener('close', function (event) {
		console.log('Disconnected from the iloveads WebSocket server');
		browser.storage.local.set({ checkboxState: false });
	});
	
	socket.addEventListener('error', function (error) {
		console.error('WebSocket error: ', error);
		browser.storage.local.set({ checkboxState: false });
	});
}

browser.webRequest.onErrorOccurred.addListener(handle_blocked_url, {
	urls: ["<all_urls>"],
});

browser.storage.onChanged.addListener((changes, areaName) => {
	if (areaName === 'local' && changes.checkboxState) {
		if (changes.checkboxState.newValue) {
			create_socket();
		} else {
			socket.close();
		}
	}
});

if (browser.storage.local.get('checkboxState')) {
	create_socket();
}
