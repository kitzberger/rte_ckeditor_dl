# TYPO3 Extension rte_ckeditor_dl

A simple wrapper extension to integrate Reinmar's [ckeditor-plugin-descriptionlist](https://github.com/Reinmar/ckeditor-plugin-descriptionlist) into TYPO3's default editor ckeditor.

## Installation

* `composer require kitzberger/rte-ckeditor-dl`
* Install extension via extension manager in the backend

### Load PageTS

Simply load the RTE configuration `default+dl` provided by this extension via PageTS to the root page of your page tree. This'll set the default RTE configuration enhanced by this plugin as a default for all RTEs in that page tree.

### Custom RTE config

Alternatively to enabling the `default+dl` configuration you can create your own RTE configuration and simply import the yaml file as described below.

#### EXT:custom/ext_localconf.php
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
