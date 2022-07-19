function fillStates() {
    const select = document.querySelector('#uf');
    const response = fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(state => {
                                const option = document.createElement('option');
                                option.value = state.sigla;
                                option.textContent = state.nome;
                                select.appendChild(option);
                            });
                        });

    return response;
}

function fillPlaces(siglaCidade) {
    const select = document.querySelector('#localidade');
    //const uf = document.querySelector('#uf').value;

    const response = fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaCidade}/distritos`)
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(place => {
                                const option = document.createElement('option');
                                option.value = place.nome;
                                option.textContent = place.nome;
                                select.appendChild(option);
                            });
                        });

    return response;
}

function findAddressByCep() {
    const cep = document.querySelector('#cep').value;

    if (cep) {
        var cidade = null;
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
                            .then(response => response.json())
                            .then(data => {
                                document.querySelector('#logradouro').value = data.logradouro;
                                document.querySelector('#bairro').value = data.bairro;
                                document.querySelector('#uf').value = data.uf;
                                //console.log
                                fillPlaces(data.uf); // DÚVIDA AQUI
                                cidade = data.localidade;
                            });
    } else {
        return alert('Informe um CEP');
    }
}

fillStates();

const button = document.querySelector('button');
button.addEventListener('click', findAddressByCep);
