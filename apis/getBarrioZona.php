<?php

    // La respuesta del PHP será en formato JSON
    header('Content-Type: application/json; charset=utf-8');
    
    if($_POST) {

        try {

            include_once('conexion.php');

            $zona_id = $_POST['zona_id'];

            $query = "SELECT b.id, b.nombre as barrio
                    FROM barrios as b
                    INNER JOIN zonas AS z ON z.id = b.zona_id
                    WHERE z.id = $zona_id";

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
                        'barrio' => $row['barrio'],
                    );
                }

                $response['success'] = true;
                $response['results'] = $data;

                echo json_encode($response);
            } else {
                $response['message'] = 'Barrios no encontrados';
                
                echo json_encode($response);
            }

        } catch(Exception $e) {
            echo $e->getMessage();
        }
    } else {
        echo 'SIN ACCESO A LA API';
    }

?>