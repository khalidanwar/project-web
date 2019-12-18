<?php
   $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project";
    try {
        $con = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo "Error: " . $e->getMessage();
    }
if(isset($_POST['interactions'])&& !empty($_POST['interactions'])){
    $interactions=json_decode($_POST['interactions'],true);
 
    foreach($interactions as $interaction){
        $type=$interaction['type'];
        $target=$interaction['target'];
        $time=$interaction['time'];
        $stmt=$con->prepare("insert into interactions(type,target,time) values(?,?,?)");
        $stmt->execute(array($type,$target,$time));
        if(! $stmt){
            echo"error";
        }
    }
}
if(isset($_GET['getiInteractions'])){
       $stmt=$con->prepare("select * from interactions order by id");
            $stmt->execute(array());
            $res=$stmt->fetchAll();
            echo json_encode($res);
}


?>