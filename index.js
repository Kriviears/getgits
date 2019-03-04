'use strict';

const searchUrl = 'https://api.github.com';
// url + `/${username}/repos`

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(resJson){
  console.log(resJson);
  $('#results-list').empty();

  for(let i=0; i<resJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${resJson[i].clone_url}">${resJson[i].name}</a></h3></li>`
    );
  }

  $('#results').removeClass('hidden');

}

function getRepos(query, username){

  const queryString = formatQueryParams(query);
  const url = `${searchUrl}/users/${username}/repos?${queryString}`;

  console.log(url);
  fetch(url)
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(resJson => displayResults(resJson))
    .catch(err =>{
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
  $('#js-form').submit(event =>{
    event.preventDefault();
    console.log('submitted');
    const username = $('#js-username').val();
    const searchType = $('#js-search-type').val();
    const sort = $('#js-sort').val();
    const direction = $('#js-direction').val();
    
    const params = {
      type: searchType,
      sort: sort,
      direction: direction
    };

    getRepos(params, username);
  });
}

$(watchForm);