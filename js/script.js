const optXml = document.getElementById('xml');
const optFetch = document.getElementById('fetch');
const optJquery = document.getElementById('jquery');
const zonaSelect = document.getElementById('selectBusqueda');
const zonaImg = document.getElementById('resultado')
const listaPerros = 'https://dog.ceo/api/breeds/list/all';

/**
 * Carga un select o imagen dependiendo del valor del select. XMLHttpRequest
 * @param {string} web 
 * @param {boolean} select 
 */
async function cargarXml(web, select) {
    let json = new XMLHttpRequest();
    json.addEventListener("readystatechange", () => {
        if (json.readyState === 4 && json.status === 200) {
            let jsonParsed = JSON.parse(json.responseText);
            if (select) {
                borrarNodosHijos(zonaSelect);
                crearSelect(jsonParsed, 'xml');
            } else {
                cargarImagen(jsonParsed);
            }
        }
    });
    json.open("GET", web);
    json.send();
}
/**
 * Carga un select o imagen dependiendo del valor del select. Fetch
 * @param {string} web 
 * @param {boolean} select 
 */
async function cargarFetch(web, select) {
    const options = {
        method: "GET"
    };
    await fetch(web, options)
        .then(response => response.text())
        .then(data => {
            let jsonParsed = JSON.parse(data);
            if (select) {
                borrarNodosHijos(zonaSelect);
                crearSelect(jsonParsed, 'fetch');
            } else {
                cargarImagen(jsonParsed);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

/**
 * Carga un select o imagen dependiendo del valor del select. Jquery
 * @param {string} web 
 * @param {boolean} select 
 */
async function cargarJquery(web, select) {
    await $.get(web, function (json) {
        if (select) {
            borrarNodosHijos(zonaSelect);
            crearSelect(json, 'jquery');
        } else {
            cargarImagen(json);
        }
    });
}

/**
 * Crea un select con el resultado del json, y el otro parámetro es la forma de request
 * @param {string} json 
 * @param {string} metodo 
 */
function crearSelect(json, metodo) {
    const elementos = json.message;
    const lista = Object.entries(elementos);
    let select = createNode('select', '', [], [{
        name: 'id',
        value: 'razas'
    }]);
    zonaSelect.appendChild(select);
    for (let [key, value] of lista) {
        if (value.length >= 1) {
            value.forEach(elem => {
                select.appendChild(createNode('option', `${elem} ${key}`, [], [{
                    name: 'value',
                    value: `${key}-${elem}`
                }]));
            })
        } else {
            select.appendChild(createNode('option', `${key}`, [], [{
                name: 'value',
                value: `${key}`
            }]));
        }
    }
    let btnBuscar = createNode('button', 'Buscar perro', [], [{
        name: 'id',
        value: 'btnBuscar'
    }]);
    btnBuscar.addEventListener('click', function () {
        buscarImagen(metodo)
    });
    zonaSelect.appendChild(btnBuscar);
}

/**
 * Carga la imagen en su zona, siendo json el link de la imagen.
 * @param {string} json 
 */
function cargarImagen(json) {
    const zonaImg = document.getElementById('resultado');
    borrarNodosHijos(zonaImg);
    zonaImg.appendChild(createNode('img', '', [], [{
        name: 'src',
        value: json.message
    }]));
}

/**
 * Busca la imagen por el valor del option y necesita un parámetro que sería el tipo de request.
 * @param {string} metodo 
 */
function buscarImagen(metodo) {
    let valor = document.getElementById('razas').value;
    valor = valor.split('-');
    let url;
    if (valor.length > 1) {
        url = `https://dog.ceo/api/breed/${valor[0]}/${valor[1]}/images/random`;
        switch (metodo) {
            case 'xml':
                cargarXml(url, false);
                break;
            case 'fetch':
                cargarFetch(url, false);
                break;
            case 'jquery':
                cargarJquery(url, false);
                break;
        }
    } else {
        url = `https://dog.ceo/api/breed/${valor}/images/random`;
        switch (metodo) {
            case 'xml':
                cargarXml(url, false);
                break;
            case 'fetch':
                cargarFetch(url, false);
                break;
            case 'jquery':
                cargarJquery(url, false);
                break;
        }
    }

}
/**
 * Crea nodos con tipo, texto, clases y atributos.
 * @param {string} nodeType
 * @param {string} nodeText 
 * @param {array} nodeClasess 
 * @param {array} nodeAttributtes 
 */
function createNode(nodeType, nodeText, nodeClasess, nodeAttributtes) {
    let node = document.createElement(nodeType);
    if (nodeText != "" && nodeText != null) {
        node.appendChild(document.createTextNode(nodeText));
    }
    if (nodeClasess.length > 0) {
        nodeClasess.forEach(clss => node.classList.add(clss));
    }
    if (nodeAttributtes.length > 0) {
        nodeAttributtes.forEach(attributte => node.setAttribute(attributte.name, attributte.value));
    }
    return node;
}

/**
 * Borra los hijos del padre seleccionado.
 * @param {string} padre 
 */
function borrarNodosHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}

/**
 * Eventos principales
 */
optXml.addEventListener('change', function () {
    cargarXml(listaPerros, true);
});
optFetch.addEventListener('change', function () {
    cargarFetch(listaPerros, true);
});
optJquery.addEventListener('change', function () {
    cargarJquery(listaPerros, true);
})