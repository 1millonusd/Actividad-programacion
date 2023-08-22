<?php

    // La respuesta del PHP será en formato JSON
    header('Content-Type: application/json; charset=utf-8');

    if($_POST) {

        try {

            include_once('conexion.php');

            $user_name = $_POST['user_name'];
            $user_email = $_POST['user_email'];
            $barrio_id = $_POST['barrio'];
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : null;
            
            if($user_id) {
                $query = "UPDATE usuarios
                        SET user_name = '$user_name', user_email = '$user_email', barrio_id = $barrio_id
                        WHERE id = $user_id"; 
                $accion = 'modificó';
            } else {
                $query = "INSERT INTO usuarios(user_name, user_email, barrio_id) 
                        VALUES ('$user_name', '$user_email', $barrio_id);";
                $accion = 'insertó';
            }

            $result = $connect->query($query);

            $response = [
                'success' => false,
                'message' => ''
            ];
            
            if($result === TRUE) {
                $response['success'] = true;
                $response['message'] = "El usuario '$user_name' se $accion con éxito";

                echo json_encode($response);
            } else {
                $response['message'] = mysqli_error($connect);
                
                echo json_encode($response);
            }

        } catch(Exception $e) {
            echo $e->getMessage();
        }
    } else {
        echo 'SIN ACCESO A LA API';
    }

?>