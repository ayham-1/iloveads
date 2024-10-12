#!/bin/sh
tmux new-session -s iloveads   -n code -d

tmux new-window  -t iloveads:2 -n run
tmux new-window  -t iloveads:3 -n files
tmux new-window  -t iloveads:4 -n git
tmux new-window  -t iloveads:5 -n kanban

tmux send-keys -t 'files' 'man tmux' Enter
tmux send-keys -t 'git' 'git log' Enter
tmux send-keys -t 'kanban' 'taskell' Enter

tmux select-window -t iloveads:1
tmux -2 attach-session -t iloveads
