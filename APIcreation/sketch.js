let link = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?calendar=blacklist'
function setup() {
  noCanvas();
  loadJSON(link, getData);
}

function getData(data) {
  //Get Points Leaders 
  console.log(data.events[0].competitions[0])
}




