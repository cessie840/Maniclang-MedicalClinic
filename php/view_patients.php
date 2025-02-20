<?php
    include 'connect.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type");

    $query = "SELECT * FROM patients";
    $result = $conn->query($query);

    $patients = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }
        echo json_encode(["status" => "success", "patients" => $patients]);
    } else {
        echo json_encode(["status" => "error", "message" => "No patients found"]);
    }

    $conn->close();
?>