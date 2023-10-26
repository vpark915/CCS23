let link = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?calendar=blacklist&dates=20231021'
function setup() {
  noCanvas();
  loadJSON(link, getData);
}

function getData(data) {
  //Get Points Leaders 
  let player = data
  console.log(player.events[0].competitions[0].attendance)
}




