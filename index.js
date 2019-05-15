const apiKey = `hLtKEoDHw7xeJ7OGajzvlcQEamDaxEDetjJ5aVka`;
const searchURL = `https://developer.nps.gov/api/v1/parks`;

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
  };

function displayParks(arr) {
    for(var i = 0; i < arr.length; i++) {
        const name = arr[i].name;
        const description = arr[i].description;
        const url = arr[i].url;

        $('#results').append(`<div class="park"><h2>${name}</h2><p>${description}</p><a href=${url}>${url}</a></div>`)
    }
}

function getParks(stateCode, limit=9) {
    const params = {
        stateCode,
        limit,
        api_key: apiKey,
    }

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            displayParks(responseJson.data);
        })
        .catch(e => {
            alert(`Error retrieving parks, ${e}`);
        });
}

function mainApp() {
    $('form').submit(function(event) {
        event.preventDefault();
        $('#results').empty();
        const stateCode = $('#state').val();
        const num = $('#number').val() - 1;
        getParks(stateCode, num);
    });
};

$(mainApp);