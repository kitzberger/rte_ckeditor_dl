<?php
$EM_CONF[$_EXTKEY] = [
	'title' => 'CKEditor Rich Text Editor: Definition lists',
	'description' => 'An extension to integrate "definition lists" into TYPO3\'s default editor ckeditor.',
	'category' => 'system',
	'state' => 'stable',
	'uploadfolder' => 0,
	'createDirs' => '',
	'clearCacheOnLoad' => 0,
	'author' => 'Philipp Kitzberger',
	'author_email' => 'typo3@kitze.net',
	'author_company' => '',
	'version' => '1.0.7',
	'constraints' => [
		'depends' => [
			'typo3' => '12.4.0-13.4.99',
		],
		'conflicts' => [],
		'suggests' => [],
	],
];
