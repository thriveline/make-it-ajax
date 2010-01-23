<strong>Form Test</strong><br/>
<a href="checkout.html"><< Back</a>
<?php
$test = array_merge($_GET, $_POST);
echo '<pre>';
print_r($test);
echo '</pre>';

?>