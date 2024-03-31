let lista_tareas = [
    {
        id: 1,
        descripcion: 'Sacar los perros a pasear por la mañana',
        status: true,
    },
    {
        id: 2,
        descripcion:'Lavar la ropa',
        status: false,
    },
    {
        id: 3,
        descripcion: 'Barrer la casa',
        status: true,
    }
]

const contenedor_lista = document.getElementById('todo-list')

function construirLista() {
    contenedor_lista.innerHTML = '';

    lista_tareas.forEach((tarea) => {
        const claseTexto = tarea.status ? 'texto-check' : 'texto-uncheck';

        contenedor_lista.innerHTML += `
            <div class="todo-item">
                <div class="contenedor1-lista">
                    <div>
                        <h5>ID:</h5>
                        <p>${tarea.id}</p>
                    </div>
                    <div>
                        <h5>Descripción:</h5>
                        <p class="descripcion ${claseTexto}" id="${tarea.id}" >${tarea.descripcion}</p>
                    </div>
                </div>
                
                <div class="acciones">
                    <div class="status">
                    </div>
                    <input type="checkbox" name="${tarea.id}" id="allow_status_${tarea.id}" onchange="Check(event)" ${tarea.status ? 'checked' : ''}>
                    <hr>
                    <button class="boton-borrar" id="text_${tarea.id}" onclick="borrarTarea(event)">X</button>
                </div>
                
            </div>`;
    });
}
construirLista();



function Check(event) {
    
    const chekSeleccionado = event.currentTarget.id

    const id = Number(event.target.name)
    const realizada = event.target.checked
    const textoEspecifico = document.getElementById(id);

    if (realizada) {
        textoEspecifico.classList.add('texto-check');
        textoEspecifico.classList.remove('texto-uncheck');
    } else {
        textoEspecifico.classList.add('texto-uncheck');
        textoEspecifico.classList.remove('texto-check');
    }

    lista_tareas = lista_tareas.map((tarea) => tarea.id === id ? { ...tarea, status: realizada } : tarea)
    contador()
}


function Agregar(event) {
    const nueva_tarea = document.getElementById('agregar').value

    if (nueva_tarea !== '') {
        lista_tareas.push({
            id: lista_tareas.length + 1,
            descripcion: nueva_tarea,
            status: false,
        });

        document.getElementById('agregar').value = '';

        construirLista();
        contador();
    } else {
       document.getElementById('alertaInput').innerHTML = "No es posible agregar tareas vacias, por favor escribe tu actividad a realizar"
       setTimeout(function() {
        alertaInput.innerHTML = '';
    }, 5000); 
    }
}

function borrarTarea(event) {
    const id = Number(event.target.id.replace('text_', '')); 

    let allowDelete;
    lista_tareas = lista_tareas.filter((tarea) => {
        if (tarea.id === id) {
            allowDelete = confirm('¿Seguro que deseas eliminar esta actividad?');
        }
        return tarea.id !== id;
    });

    construirLista();
    contador();
}

function contador() {
    const cantidad = lista_tareas.length

    const hechas = lista_tareas.reduce((count, tarea) => {

        if (tarea.status) {
            return count += 1
        } else {
            return count
        }

    }, 0)


    document.getElementById('cantidad').innerHTML = cantidad
    document.getElementById('hechas').innerHTML = hechas
}

contador()