<?php
    include 'connect.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    $data = json_decode(file_get_contents("php://input"));

    $name = $conn->real_escape_string($data->name);
    $age = $conn->real_escape_string($data->age);
    $gender = $conn->real_escape_string($data->gender);
    $contact = $conn->real_escape_string($data->contact);

    $query = "INSERT INTO patients (name, age, gender, contact) VALUES ('$name', '$age', '$gender', '$contact')";
    if ($conn->query($query) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Patient added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error adding patient: " . $conn->error]);
    }

    $conn->close();
?>