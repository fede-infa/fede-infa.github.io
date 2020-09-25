
const URL = 'https://api.exchangeratesapi.io/latest',
 $body = document.querySelector('body'),
 $fecha = document.querySelector('#date'),
 $moneda = document.querySelector('#monedaBase'),
 nuevaFecha = new Date(), 
 dd = String(nuevaFecha.getDate()).padStart(2, '0'),
 mm = String(nuevaFecha.getMonth() + 1).padStart(2, '0'), //Enero es 0
 yyyy = nuevaFecha.getFullYear(),
 today = yyyy + '-' + mm + '-' + dd,
 msgError = document.querySelector('#dateError');


let currency = $moneda.value;


$fecha.value = yyyy + '-' + mm + '-' + dd;

fetch(URL)
    .then(response => response.json())
    .then(response => {
        const $h1 = document.querySelector('h1');
        const $divLista = document.querySelector('#listaExchange');
        const $ul = document.createElement('ul');
        
        $divLista.appendChild($ul);
        $ul.className = 'col-2 list-group';
        $h1.textContent = `Cambios en moneda ${response.base} de la fecha ${response.date}`;
        
        Object.keys(response.rates).forEach( currency => {
            const $li = document.createElement('li');
        
            $li.className = 'list-group-item';
            $li.textContent = `${currency}: ${response.rates[currency]}`;
            $ul.appendChild($li);            
        })
    });

$fecha.onchange = () =>{
    if ($fecha.value <= today){
        $fecha.style.borderColor = '';
        msgError.textContent = '';
        $fecha.classList.remove('is-invalid');
        fetch(`https://api.exchangeratesapi.io/${$fecha.value}`)
            .then(response => response.json())
            .then(response => {
                const $h1 = document.querySelector('h1');
                const $divLista = document.querySelector('#listaExchange');
                const $ul = document.createElement('ul');
                
                $divLista.innerHTML = '';
                $divLista.appendChild($ul)
                $ul.className = 'col-2 list-group';
                $h1.textContent = `Cambios en moneda ${response.base} de la fecha ${response.date}`;
                
                Object.keys(response.rates).forEach( currency => {
                    const $li = document.createElement('li');
                
                    $li.className = 'list-group-item';
                    $li.textContent = `${currency}: ${response.rates[currency]}`;
                    $ul.appendChild($li);            
                })
            })
    } else if($fecha.value > today){
        msgError.textContent = 'Debe ingresar una fecha igual o menor a la actual';
        msgError.classList.add('validation')
        $fecha.classList.add('is-invalid');
    }
}

$moneda.onchange = () => {
    if(currency != $moneda.value){
        currency = $moneda.value;

        fetch(`https://api.exchangeratesapi.io/${$fecha.value}?base=${$moneda.value}`)
            .then(response => response.json())
            .then(response => {
                const $h1 = document.querySelector('h1');
                const $divLista = document.querySelector('#listaExchange');
                const $ul = document.createElement('ul');
                
                $divLista.innerHTML = '';
                $divLista.appendChild($ul)
                $ul.className = 'col-2 list-group';
                $h1.textContent = `Cambios en moneda ${response.base} de la fecha ${response.date}`;
                
                Object.keys(response.rates).forEach( currency => {
                    const $li = document.createElement('li');
                
                    $li.className = 'list-group-item';
                    $li.textContent = `${currency}: ${response.rates[currency]}`;
                    $ul.appendChild($li);            
                })
            })

    }

}
