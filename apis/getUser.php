<?php

    // La respuesta del PHP será en formato JSON
    header('Content-Type: application/json; charset=utf-8');

    if($_GET) {

        try {

            include_once('conexion.php');

            $user_id = $_GET['user_id'];
    
            $query = "SELECT u.id, u.user_name, u.user_email, u.barrio_id, z.id as zona_id
                    FROM usuarios AS u 
                    INNER JOIN barrios AS b ON b.id = u.barrio_id
                    INNER JOIN zonas AS z ON z.id = b.zona_id
                    WHERE u.id = $user_id";
    
            $result = $connect->query($query);

            $response = [
                'success' => false,
                'results' => null,
                'message' => ''
            ];
            
            if($result->num_rows > 0) {
    
                while ($row = $result->fetch_assoc()) {
                    $data[] = array(
                        'id' => $row['id'],
                        'user_name' => $row['user_name'],
                        'user_email' => $row['user_email'],
                        'barrio_id' => $row['barrio_id'],
                        'zona_id' => $row['zona_id']
                    );
                }

                $response['success'] = true;
                $response['results'] = $data;
    
                echo json_encode($response);
            } else {
                $response['message'] = 'Usuario no encontrado';
                
                echo json_encode($response);
            }
    
        } catch(Exception $e) {
            echo $e->getMessage();
        }
    } else {
        echo 'SIN ACCESO A LA API';
    }

?>