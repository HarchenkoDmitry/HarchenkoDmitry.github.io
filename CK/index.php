<?php
    
    $file = 'questions_users.txt';
    
    $t = '';

    foreach ($_POST as $k => $v) {
        $t.= $k.':  '.$v."\n";
    }
    
    
    $current = file_get_contents($file);
    
    $current .= $t."\n\n\n";
    
    file_put_contents($file, $current);

?>