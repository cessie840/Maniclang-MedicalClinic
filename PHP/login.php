<?php 
    session_start();
    include 'connect.php';

    header('Content-Type: application/json');

    $data = json_decode(file_get_contents("php://input"));

    $username = $conn=>real_escape_string($data->username);
    $password = $data->password;

    $query = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($query);
    
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(["status" => "success", "message" => "Login successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

    $conn->close();
?>