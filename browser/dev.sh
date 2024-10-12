#!/bin/sh
tmux new-session -s iloveads_brow   -n code -d

tmux new-window  -t iloveads_brow:2 -n run
tmux new-window  -t iloveads_brow:3 -n files
tmux new-window  -t iloveads_brow:4 -n git

tmux send-keys -t 'files' 'man tmux' Enter
tmux send-keys -t 'git' 'git log' Enter

tmux select-window -t iloveads_brow:1
tmux -2 attach-session -t iloveads_brow
