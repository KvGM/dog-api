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