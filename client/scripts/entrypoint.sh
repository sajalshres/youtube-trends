#!/bin/sh

npm rebuild esbuild

# entrypoint passthrough for docker
exec "$@"