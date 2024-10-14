import os
import configparser
from enum import Enum

config = configparser.ConfigParser()

PERC_URL_TO_SEEK = "perc_url_to_seek"

def get_config_location():
    results = ['/etc/iloveads/config.ini', os.path.expanduser('~/.config/iloveads/config.ini'), 'config.ini']
    return results

def read_config():
    global config
    config.read(get_config_location())
