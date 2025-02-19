<?php 
    session_start();
    include 'connect.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->username) || !isset($data->password)) {
        echo json_encode(["status" => "error", "message" => "Missing username or password"]);
        exit();
    }
    
    $username = $conn->real_escape_string($data->username);
    $password = $data->password;

    // Fetch user from database
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // DEBUGGING: Print stored and entered passwords
        error_log("Entered password: " . $password);
        error_log("Stored password in DB: " . $row['password']);

        // Validation
        if ($password === $row['password']) {  
            $_SESSION['user_id'] = $row['id'];
            echo json_encode(["status" => "success", "message" => "Login successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found"]);
    }

    $conn->close();
?>
