#!/usr/bin/env bash

set -euo pipefail

uninstall_zsh_root() {
  echo "Removing bash completion script"
  rm -f "/usr/share/zsh/site-functions/_escli"
}

uninstall_bash_root() {
  echo "Removing zsh completion script"
  rm -f "/usr/share/bash-completion/completions/escli"
}

uninstall() {
  uninstall_zsh_root
  uninstall_bash_root
}

main() {
  if [ "$(id -u)" -ne 0 ]; then
    echo "This program requires root privileges" >&2
    echo "Please run it as root or try either 'pkexec ${0}' or 'sudo ${0}'" >&2
    exit 1
  fi
  uninstall
}

main
