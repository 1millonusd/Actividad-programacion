// importamos la funcion para cargar la tabla
import { cargar_tabla_usuarios } from './tabla.js';

// Inicio de la funcion cuando se termina de cargar la pagina
// $(function() { ... })

let user_id = null;

let base_url = `${location.href}apis/`;

console.log(base_url);

$(async function () {

    let table = await cargar_tabla_usuarios();

    /* setInterval( function () {
        table.ajax.reload(null, false); // https://datatables.net/reference/api/ajax.reload()
    }, 2000); */


    // Captura de Evento
    $('#zona').on('change', function (e) {
        let zona_id = e.target.value; // option value seleccionado del combo zonas
        fillComboZona(zona_id);
    });

    // Al iniciar la pagina, se debe llenar el combo de barrios con la zona seleccionada por defecto
    let zona_id = $('#zona')[0].value;
    fillComboZona(zona_id);

    // Funcion para llenar el combo zonas
    function fillComboZona(id, barrio_id = null) {
        let data = {
            zona_id: id
        }

        // AJAX CON FUNCION POST PARA CARGAR LOS BARRIOS SEGUN LA ZONA SELECCIONADA
        $.post(base_url + 'getBarrioZona.php', data, function (response) {
            if (response.success) {

                let barrios = response.results;
                let comboBarrios = $('#barrio');
                comboBarrios.empty(); // eliminamos todos los options del combo de barrios

                for (let i = 0; i < barrios.length; i++) {
                    let barrio = barrios[i];
                    let option = '<option value="' + barrio['id'] + '">' + barrio['barrio'] + '</option>';
                    comboBarrios.append(option); // agregamos el codigo html del option al combo de barrios
                }

                // si el id NO es null entonces debemos cambiar el valor del combo de barrios
                if (barrio_id) comboBarrios.val(barrio_id);

            } else {
                console.log(response.message);
            }
        })
            .fail(function (error) {
                console.log(error.statusText, error.status);
            });
    }

    // ENVIO DEL FORMULARIO
    $('#form-nuevo-usuario').on('submit', function (e) {
        e.preventDefault(); // Detener el envío del formulario para evitar recargar la página

        if ($(this)[0].checkValidity()) {
            // Convertir el formulario en un array de objetos
            let form = $(this).serializeArray();

            if (user_id) {
                form.push({
                    name: 'user_id',
                    value: user_id
                });
            }

            $.post(base_url + 'addNewUser.php', form, function (response) {
                $('#modal-nuevo-usuario').modal('hide'); // Ocultar el modal de carga
                alert(response.message);

                // Resetear el formulario
                $('#form-nuevo-usuario')[0].reset();

                user_id = null; // Resetear la variable que guardaba el ID

                table.ajax.reload(null, false); // Actualizar la tabla
            })
                .fail(function (error) {
                    console.log(error.statusText, error.status);
                });
        } else {
            // Si el formulario no es válido, muestra un mensaje de error o realiza otra acción
            console.log('Formulario no válido');
        }
    });

    $(document).on('click', '.editar', function () {
        let id = $(this).val();

        let data = {
            user_id: id
        }

        $.get(base_url + 'getUser.php', data, function (response) {
            if (response.success) {
                fillModal(response.results[0]);
            } else {
                console.log(response.message);
            }
        })
            .fail(function (error) {
                console.log(error.statusText, error.status);
            });
    });

    function fillModal(userInfo) {
        user_id = userInfo.id;
        $('#user_name').val(userInfo.user_name);
        $('#user_email').val(userInfo.user_email);
        $('#zona').val(userInfo.zona_id);
        fillComboZona(userInfo.zona_id, userInfo.barrio_id);
    }

    $('#modal-nuevo-usuario').on('hidden.bs.modal', function () {
        user_id = null;
    });

    $(document).on('click', '.eliminar', function () {
        let id = $(this).val();

        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            $.post(base_url + 'deleteuser.php', { user_id: id }, function (response) {
                table.ajax.reload();
            })
                .fail(function (error) {
                    console.log(error.statusText, error.status);
                });
        }
    });
});