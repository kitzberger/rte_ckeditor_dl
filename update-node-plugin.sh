#!/bin/bash

SOURCE="node_modules/@kitzberger/ckeditor5-definitionlist"
TARGET="Resources/Public/Contrib/@kitzberger/ckeditor5-definitionlist"

npm update
rm -rf "$TARGET"
cp -a "$SOURCE" "$TARGET"

# Fix broken path
sed -i '/^import { Plugin, ButtonView, StyleUtils, Command } from '\''ckeditor5'\'';$/{
    s/.*/import { Plugin, Command } from '\''@ckeditor\/ckeditor5-core'\'';\
import { ButtonView } from '\''@ckeditor\/ckeditor5-ui'\'';\
import { StyleUtils } from '\''@ckeditor\/ckeditor5-style'\'';/
}' "$TARGET/dist/index.js"
