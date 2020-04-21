"use strict";

const key = 'kUpVdjJwJ2pAX6aj4OpfCnVBgnEFwky5Pg3WNIsZ'
const baseUrl = 'https://developer.nps.gov/api/v1/parks?'


function formatParams(params) {
    const formatedParams = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return formatedParams.join('&');
}

function getParks() {

    const statesInput = $('#park-Search').val().trim().toString();
    let qty = $('#qty').val().trim().toString();

    if(qty === ''){
        qty = '10'
    }

    const states = statesInput.split(', ')
    const params = {
        limit: qty,
        api_key: key
    }

    for (let i = 0; i < states.length; i++) {
        params.q = states[i]
        const parameter = formatParams(params)
        const url = baseUrl + parameter;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    console.log(response)
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(jsonResponse => displayresults(jsonResponse.data))
    }
}

function displayresults(results) {
    $(".loader").css("display", "none");
    for (let i = 0; i < results.length; i++) {
        $('#results').append(`<li><h2>${results[i].name}</h2>
        <p>${results[i].description}</p>
        <p><a href='${results[i].url}'>${results[i].url}</a></p>
        </li> `)
    }
}

function watchForm(ev) {
    ev.preventDefault()
    $('#results').empty()
    $(".loader").css("display", "block");
    getParks()
}