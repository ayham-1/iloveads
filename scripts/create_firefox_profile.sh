#!/bin/bash

firefox -CreateProfile "iloveads"
echo "Setup the profile with the required extensions"
firefox -P iloveads -no-remote
