chrome.browserAction.onClicked.addListener(function (tab) {
	if (typeof browser !== 'undefined') {
		// Firefox-specific
		browser.tabs.create({ url: 'popup.html' });
	} else {
		// Chrome/Edge
		chrome.tabs.create({ url: 'popup.html' });
	}
});

