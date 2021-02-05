const xml = document.getElementById('xml');
const fetch = document.getElementById('fetch');
const jquery = document.getElementById('jquery');

function cargarXml(web, select) {
    let json = new XMLHttpRequest();
    json.addEventListener("readystatechange", () => {
        if (json.readyState === 4 && json.status === 200) {
            let jsonParsed = JSON.parse(json.responseText);
            if (select == true) {
                crearSelect(jsonParsed);
            } else {
                cargarImagen(jsonParsed);
            }
        }
    });
    json.open("GET", web);
    json.send();
}
xml.addEventListener('change', function () {
    cargarXml('https://dog.ceo/api/breeds/list/all', true);
});

function crearSelect(json) {
    const elementos = json.message;
    const lista = Object.entries(elementos);
    const zonaSelect = document.getElementById('selectBusqueda');
    borrarNodosHijos(zonaSelect);
    let select = createNode('select', '', [], [{
        name: 'id',
        value: 'razas'
    }]);
    zonaSelect.appendChild(select);
    for (let i = 0; i < lista.length; i++) {
        if (lista[i][1][0] != undefined) {
            for (let j = 0; j < lista[i][1].length; j++) {
                select.appendChild(createNode('option', `${lista[i][1][j]} ${lista[i][0]}`, [], [{
                    name: 'value',
                    value: `${lista[i][0]}-${lista[i][1][j]}`
                }]));
            }
        } else {
            select.appendChild(createNode('option', `${lista[i][0]}`, [], [{
                name: 'value',
                value: `${lista[i][0]}`
            }]));
        }
    }
    let btnBuscar = createNode('button', 'Buscar perro', [], [{
        name: 'id',
        value: 'btnBuscar'
    }]);
    btnBuscar.addEventListener('click', buscarImagen);
    zonaSelect.appendChild(btnBuscar);
}

function cargarImagen(json) {
    const zonaImg = document.getElementById('resultado');
    borrarNodosHijos(zonaImg);
    zonaImg.appendChild(createNode('img', '', [], [{
        name: 'src',
        value: json.message
    }]));
}

function buscarImagen() {
    let valor = document.getElementById('razas').value;
    valor = valor.split('-');
    if (valor.length > 1) {
        cargarXml(`https://dog.ceo/api/breed/${valor[0]}/${valor[1]}/images/random`, false);
    } else {
        //Link por raza
        cargarXml(`https://dog.ceo/api/breed/${valor}/images/random`, false);
    }
}


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

function borrarNodosHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}