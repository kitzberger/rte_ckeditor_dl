<?php
defined('TYPO3') || die('Access denied.');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
	'rte_ckeditor_dl',
	'Configuration/TsConfig/Page/definitionlists.ts',
	'RTE: definition lists'
);
