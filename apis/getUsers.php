<?php

    // La respuesta del PHP será en formato JSON
    header('Content-Type: application/json; charset=utf-8');

    try {

        include_once('conexion.php');

        $query = "SELECT u.id, u.user_name, u.user_email, b.nombre as barrio, z.nombre as zona
                FROM usuarios AS u 
                INNER JOIN barrios AS b ON b.id = u.barrio_id
                INNER JOIN zonas AS z ON z.id = b.zona_id";

        $result = $connect->query($query);
        
        if($result->num_rows > 0) {

            while ($row = $result->fetch_assoc()) {
                $data[] = array(
                    'id' => $row['id'],
                    'user_name' => $row['user_name'],
                    'user_email' => $row['user_email'],
                    'barrio' => $row['barrio'],
                    'zona' => $row['zona']
                );
            }

            echo json_encode($data);
        } else {
            echo json_encode(array());
        }

    } catch(Exception $e) {
        echo $e->getMessage();
    }

?>