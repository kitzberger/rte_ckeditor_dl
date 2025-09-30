# TYPO3 Extension rte\_ckeditor\_dl

A simple wrapper extension to [ckeditor5-definitionlist](https://github.com/kitzberger/ckeditor5-definitionlist) into TYPO3's default editor ckeditor 5.

## Installation

* `composer require kitzberger/rte-ckeditor-dl`
* Install extension via extension manager in the backend

### Load PageTS

Simply load the RTE configuration `default+dl` provided by this extension via PageTS to the root page of your page tree. This'll set the default RTE configuration enhanced by this plugin as a default for all RTEs in that page tree.

### Custom RTE config

Alternatively to enabling the `default+dl` configuration you can create your own RTE configuration and simply import the yaml file as described below.

#### EXT:custom/ext\_localconf.php

```php
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['custom'] = 'EXT:custom/Configuration/RTE/Default.yaml';
```

#### EXT:custom/Configuration/RTE/Default.yaml

```yaml
# Load default processing options + the dl plugin
imports:
  - { resource: "EXT:rte_ckeditor/Configuration/RTE/Processing.yaml" }
  - { resource: "EXT:rte_ckeditor/Configuration/RTE/Editor/Base.yaml" }
  - { resource: "EXT:rte_ckeditor/Configuration/RTE/Editor/Plugins.yaml" }
  - { resource: "EXT:rte_ckeditor_dl/Configuration/RTE/Plugin.yaml" }
```

#### Add insert button

To add the 'insert definition list' button to the editors toolbar:

```yaml
editor:
  config:
    toolbar:
      items:
        ...
        - definitionList
        ...
```

## Usage

By clicking that 'insert definition list' button a new `<dl>` is being inserted into the RTE. This `<dl>` contains a single pair of dummy `<dt>` and `</dd>` tags.

Keyboard bindings:

* Transform a `<dt>` into a `<dd>` and vice versa by pressing "tab" resp. "shift+tab".
* Pressing "enter" at the end of a `<dt>` creates a new `<dd>`.
* Pressing "enter" at the end of a `<dd>` creates a new `<dt>`.
* Pressing "del" or "backspace" on an empty `<dt>`/`<dd>` removes it.
* Pressing "arrow down" at the end of the last `<dd>` inserts a new `<p>` after the `<dl>`
* Pressing "arrow up" at the beginning of the first `<dt>` inserts a new `<p>` before the `<dt>`

When having the indent/outdent buttons present in the RTE toolbar they can be used as well for transforming the `<dt>` and `<dd>` tags.

## Trouble shooting

Weird `<p>` tags show up in markup like this here?

```
<dl>
	<dt>Foo</dt>
	<dd>
		<p class="bodytext">Bar</p>
	</dd>
	<dt>Fuu</dt>
	<dd>
		<p class="bodytext">Bat</p>
	</dd>
	<p class="bodytext">&nbsp;</p>
</dl>
```

Tweak TYPO3's pareFunc\_RTE a little to get rid of that:

```
lib.parseFunc_RTE.externalBlocks.dl.callRecursive >
lib.parseFunc_RTE.externalBlocks.dl.stdWrap.parseFunc =< lib.parseFunc
```
