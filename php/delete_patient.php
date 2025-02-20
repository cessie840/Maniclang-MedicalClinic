<?php
    include 'connect.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    $data = json_decode(file_get_contents("php://input"));

    $id = $conn->real_escape_string($data->id);

    $query = "DELETE FROM patients WHERE id='$id'";
    if ($conn->query($query) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Patient deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error deleting patient: " . $conn->error]);
    }

    $conn->close();
?>