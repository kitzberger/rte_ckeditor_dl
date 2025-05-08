#!/bin/bash

SOURCE="node_modules/@kitzberger/ckeditor5-definitionlist"
TARGET="Resources/Public/Contrib/@kitzberger/ckeditor5-definitionlist"

npm update
rm -rf "$TARGET"
cp -a "$SOURCE" "$TARGET"
