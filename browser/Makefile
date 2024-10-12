EXTENSION_DIR=./browser/
FIREFOX_PROFILE_DIR=./cache/firefox-profile
CHROME_PROFILE_DIR=./cache/chrome-profile

.PHONY: run-firefox clean

run-chrome:
	@mkdir -p $(CHROME_PROFILE_DIR)
	@echo "Running Chromium with the extension..."
	chromium --user-data-dir=$(CHROME_PROFILE_DIR) --load-extension=$(EXTENSION_DIR)

run-firefox:
	@mkdir -p $(FIREFOX_PROFILE_DIR)
	@echo "Creating a temporary Firefox profile..."
	web-ext run --source-dir=$(EXTENSION_DIR) --firefox-profile=$(FIREFOX_PROFILE_DIR)

clean:
	@echo "Cleaning up profile directories..."
	rm -rf $(CHROME_PROFILE_DIR) $(FIREFOX_PROFILE_DIR) cache

