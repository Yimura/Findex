<?php
session_start();
if (isset($_POST['keyword'])) {
    //require '../functions.php';
    //$_SESSION['activeDirectory'];
    $keyword = $_POST['keyword'];
}
else {
    header('HTTP/1.0 403 Forbidden');
    die("Access denied");
}
?>
<h5 class="uk-margin-remove-bottom searchCategoryTitle">Files found:</h5>
<hr class="searchDivider">
<a class="searchResult uk-margin-remove-bottom" href="#"><?php echo $keyword; ?></a>
<h5 class="uk-margin-remove-bottom searchCategoryTitle">Folders found:</h5>
<hr class="searchDivider">
<a class="searchResult uk-margin-remove-bottom" href="#"><?php echo $keyword; ?></a>
