<?php
    include 'connect.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        $id = $conn->real_escape_string($data->id);
        $name = $conn->real_escape_string($data->name);
        $age = $conn->real_escape_string($data->age);
        $gender = $conn->real_escape_string($data->gender);
        $contact = $conn->real_escape_string($data->contact);

        $query = "UPDATE patients SET name='$name', age='$age', gender='$gender', contact='$contact' WHERE id='$id'";
        if ($conn->query($query) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Patient updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error updating patient: " . $conn->error]);
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
    }

    $conn->close();
?>