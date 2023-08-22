<?php
    // La respuesta del PHP será en formato JSON
    header('Content-Type: application/json; charset=utf-8');

    if ($_POST) {
        try {
            include_once('conexion.php');

            $user_id = $_POST['user_id'];

            $query = "DELETE FROM usuarios WHERE id = $user_id";

            $result = $connect->query($query);

            $response = [
                'success' => false,
                'message' => ''
            ];

            if ($result) {
                $response['success'] = true;
                $response['message'] = 'Usuario eliminado exitosamente.';
                echo json_encode($response);
            } else {
                $response['message'] = 'No se pudo eliminar el usuario.';
                echo json_encode($response);
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    } else {
        echo 'SIN ACCESO A LA API';
    }
?>
