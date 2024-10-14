import asyncio
import websockets

from random import randrange

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromiumService
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.os_manager import ChromeType

global config
from iloveads.config import read_config, config, PERC_URL_TO_SEEK

driver = None
current_tabs_open = 0

def setup_webdriver():
    global driver

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_experimental_option("prefs", {
    "download.prompt_for_download": False,  # Disable the download prompt
    "download.directory_upgrade": True,     # Automatically overwrite older files
    "safebrowsing.enabled": True,           # Enable safe browsing
})
    driver = webdriver.Chrome(service=ChromiumService(ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install()), options=chrome_options)

    print("WebDriver initialized")

def love_url(url):
    global driver
    if driver is None:
        print("WebDriver not initialized yet")
        return

    if randrange(100) > int(config["settings"][PERC_URL_TO_SEEK]):
        print("Skipping URL: ", url)
        return

    driver.get(url)

async def ws_handler(websocket, _):
    global driver

    async for message in websocket:
        print(f"Received message from extension: {message}")

        if message.startswith("blocked:"):
            url = message[len("blocked:"):].strip()
            if driver is None:
                print("WebDriver not initialized yet")
                continue
            love_url(url)

def main():
    import importlib.metadata
    version = importlib.metadata.version("iloveads")
    print(f"iloveads v{version}")
    read_config()
    setup_webdriver()
    start_server = websockets.serve(ws_handler, "localhost", 61434)
    
    asyncio.get_event_loop().run_until_complete(start_server)
    print("WebSocket server started at ws://localhost:61434")

    asyncio.get_event_loop().run_forever()
