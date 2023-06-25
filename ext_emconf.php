<?php
$EM_CONF[$_EXTKEY] = [
	'title' => 'CKEditor Rich Text Editor: Definition lists',
	'description' => 'A simple wrapper extension to integrate Reinmar\'s ckeditor-plugin-descriptionlist into TYPO3\'s default editor ckeditor.',
	'category' => 'system',
	'state' => 'stable',
	'uploadfolder' => 0,
	'createDirs' => '',
	'clearCacheOnLoad' => 0,
	'author' => 'Philipp Kitzberger',
	'author_email' => 'typo3@kitze.net',
	'author_company' => '',
	'version' => '1.0.8',
	'constraints' => [
		'depends' => [
			'typo3' => '8.7.0-11.5.99',
		],
		'conflicts' => [],
		'suggests' => [],
	],
];
