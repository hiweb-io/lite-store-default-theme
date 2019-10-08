<?php

$indexHtml = file_get_contents('index.html');

$head = file_exists('head') ? file_get_contents('head') : '';

exit(str_replace('</head>', $head.'</head>', $indexHtml));