// RESUMEN DE ALGUNAS OPCIONES DE DATATABLES -> https://datatables.net/reference/option/ 

let configurationDataTable = {
	paging: true,
	pageLength: 10,
	destroy: true, // https://datatables.net/reference/option/destroy
	deferRender: false,// https://datatables.net/reference/option/deferRender
	// bLengthChange: false, // Oculta el select
	responsive: true,
    // searching: false, // Oculta el input de busqueda
	language: {
		"sProcessing": "Procesando...",
		"sLengthMenu": "Mostrar _MENU_ registros",
		"sZeroRecords": "No se encontraron resultados",
		"sEmptyTable": "Ningún dato disponible en esta tabla",
		"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
		"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix": "",
		"sSearch": "Buscar:",
		"search": "_INPUT_",
		"searchPlaceholder": "Buscar Usuario",
		"sUrl": "",
		"sInfoThousands": ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst": "Primero",
			"sLast": "Último",
			"sNext": "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}
	},
};

let base_url = `${location.href}apis/`;

export async function cargar_tabla_usuarios() {
    // JSON.stringfy -> Esta función se utiliza para convertir un OBJETO JAVASCRIPT en una CADENA/STRING JSON.
    // JSON.parse -> Esta función se utiliza para convertir una CADENA/STRING JSON en un OBJETO JAVASCRIPT.
    
    // let configDataTable = JSON.parse(JSON.stringify(configurationDataTable));
    let configDataTable = configurationDataTable;

    console.log(configDataTable);

    // https://datatables.net/reference/option/dom
    configDataTable['dom'] = 'lfrtip';

    configDataTable['order'] = [
        [0, 'desc']
    ];

    // https://datatables.net/reference/option/ajax
    configDataTable['ajax'] = {
        url: base_url + 'getUsers.php',
        method: 'GET',
        dataSrc: '', // https://datatables.net/reference/option/ajax.dataSrc
    };

    // https://legacy.datatables.net/ref#fnCreatedRow
    configDataTable['fnCreatedRow'] = function (row, data, iDataIndex) {
        $(row).attr('id', data['id']); // Agregamos el ID a cada fila como atributo del elemento HTML
    };

    // Definicion de columnas -> https://datatables.net/reference/option/columns
    configDataTable['columns'] = [
        {
            data: function (data, type, dataToSet) {
                return data['id'];
            }
        },
        {
            data: function(data, type, dataToSet) {
                return data['user_name'];
            }
        },
        {
            data: function (data, type, dataToSet) {
                return data['user_email'];
            }
        },
        {
            data: function(data, type, dataToSet) {
                return data['barrio'];
            }
        },
        {
            data: function(data, type, dataToSet) {
                return data['zona'];
            }
        },
        {
            orderable: false,
            data: function(data, type, dataToSet) {

                let buttonEditar = '<button class="btn btn-black editar" value="'+data['id']+'" data-toggle="modal" data-target="#modal-nuevo-usuario">Editar</button>';
                let buttonEliminar = '<button class="btn btn-danger ml-2 eliminar" value="'+data['id']+'">Eliminar</button>';

                let div = '<div>';
                    div += buttonEditar;
                    div += buttonEliminar;
                div += '</div>';

                return div;
            }
        }
    ];

    let table = $('#tabla_usuarios').DataTable(configDataTable);

    return table;
}