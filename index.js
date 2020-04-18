const key = 'kUpVdjJwJ2pAX6aj4OpfCnVBgnEFwky5Pg3WNIsZ'
const baseUrl = 'https://developer.nps.gov/api/v1/parks?'


function formatParams (params){
    const formatedParams = Object.keys(params)
    .map(key =>`${key}=${params[key]}`)
    console.log(formatedParams)
    return formatedParams.join('&');
}

function getParks(ev){
    ev.preventDefault()
    const parkSearch = $('select').val().toString();
    const qty =  $('#qty').val().toString();

    console.log(parkSearch)
    const params = {
        q: parkSearch,
        limit: qty,
        api_key: key
    }

    const options = {
        headers: new Headers({
            api_key: key
        })
    }
    parameter = formatParams(params)

    const url = baseUrl + parameter;

    fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
    } )
    .then(jsonResponse => displayresults(jsonResponse.data))
}

function displayresults(results){
    $('#results').empty()
    for(let i = 0;  i < results.length ; i++){
        $('#results').append(`<li><h2>${results[i].name}</h2>
        <p>${results[i].description}</p>
        <p><a href='${results[i].url}'>${results[i].url}</a></p>
        </li> `)
    }
}