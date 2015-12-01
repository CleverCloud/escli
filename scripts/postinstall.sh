#!/usr/bin/env bash

set -euo pipefail

cat << EOF
To enable autocompletion automatically, run 'install-escli-completion'

If you want to install completion manually (requires root privileges):

    clever --bash-autocomplete-script "\$(which clever)" > /usr/share/bash-completion/completions/escli
    clever --zsh-autocomplete-script "\$(which clever)" > /usr/share/zsh/site-functions/_escli

You can uninstall autocompletion at any moment by running 'uninstall-escli-completion'
EOF
