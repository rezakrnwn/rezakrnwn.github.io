const base_url = "https://api.football-data.org/";
const token = "a25f333625104998bba806cf70ad777d";
const league_id = '2002';

const status = response => {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = response => {
  return response.json();
}

const error = error => {
  console.log(`Error : ${error}`);
}

const getStandings = () => {
  if ('caches' in window) {
    caches.match(`${base_url}v2/competitions/${league_id}/standings`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let standingHTML = "";
          data.standings[0].table.forEach(function (standing) {
            let imageUrl = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
            standingHTML += `
            <div class="card">
              <div class="card-image">
                  <img
                      src="${imageUrl}" alt="${standing.team.name}">
              </div>
              <div class="card-content">
                  <span class="card-title">${standing.position}. ${standing.team.name}</span>
                  <div class="row">
                      <table class="responsive-table">
                          <thead>
                              <tr>
                                  <th><b>playedGames</b></th>
                                  <th><b>won</b></th>
                                  <th><b>draw</b></th>
                                  <th><b>lost</b></th>
                                  <th><b>points</b></th>
                                  <th><b>goalsFor</b></th>
                                  <th><b>goalsAgainst</b></th>
                                  <th><b>goalDifference</b></th>
                              </tr>
                          </thead>
                          
                          <tbody>
                              <tr>
                                <td>${standing.playedGames}</td>
                                <td>${standing.won}</td>
                                <td>${standing.draw}</td>
                                <td>${standing.lost}</td>
                                <td>${standing.points}</td>
                                <td>${standing.goalsFor}</td>
                                <td>${standing.goalsAgainst}</td>
                                <td>${standing.goalDifference}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
            </div>`;
          });

          document.getElementById("standings").innerHTML = standingHTML;
        })
      }
    });
  }

  fetch(`${base_url}v2/competitions/${league_id}/standings`,{
    headers: {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let standingHTML = "";
      data.standings[0].table.forEach(function (standing) {
        let imageUrl = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
        standingHTML += `
            <div class="card">
              <div class="card-image">
                  <img
                      src="${imageUrl}" alt="${standing.team.name}">
              </div>
              <div class="card-content">
                  <span class="card-title">${standing.position}. ${standing.team.name}</span>
                  <div class="row">
                      <table class="responsive-table">
                          <thead>
                              <tr>
                                  <th><b>playedGames</b></th>
                                  <th><b>won</b></th>
                                  <th><b>draw</b></th>
                                  <th><b>lost</b></th>
                                  <th><b>points</b></th>
                                  <th><b>goalsFor</b></th>
                                  <th><b>goalsAgainst</b></th>
                                  <th><b>goalDifference</b></th>
                              </tr>
                          </thead>
                          
                          <tbody>
                              <tr>
                                  <td>${standing.playedGames}</td>
                                  <td>${standing.won}</td>
                                  <td>${standing.draw}</td>
                                  <td>${standing.lost}</td>
                                  <td>${standing.points}</td>
                                  <td>${standing.goalsFor}</td>
                                  <td>${standing.goalsAgainst}</td>
                                  <td>${standing.goalDifference}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
            </div>`;
      });

      document.getElementById("standings").innerHTML = standingHTML;
    });
}

const getMatches = () => {
  if ('caches' in window) {
    caches.match(`${base_url}v2/matches`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let matchHTML = "";
          data.matches.forEach(function (match) {
            matchHTML += `
            <a href="../match.html?id=${match.id}">
              <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                      <span class="card-title">${match.competition.name}</span>
                      <div class="row">
                          <div class="col s6 m6">
                              <b>Home Team</b>
                              <h6>${match.homeTeam.name}</h6>
                          </div>
                          <div class="col s6 m6">
                              <b>Away Team</b>
                              <h6>${match.awayTeam.name}</h6>
                          </div>
                      </div>
                  </div>
              </div>
            </a>
            `;
          });

          document.getElementById("matches").innerHTML = matchHTML;
        })
      }
    });
  }

  fetch(`${base_url}v2/matches`, {
    headers: {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let matchHTML = "";
      data.matches.forEach(function (match) {
        matchHTML += `
        <a href="../match.html?id=${match.id}">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title">${match.competition.name}</span>
                <div class="row">
                    <div class="col s6 m6">
                        <b>Home Team</b>
                        <h6>${match.homeTeam.name}</h6>
                    </div>
                    <div class="col s6 m6">
                        <b>Away Team</b>
                        <h6>${match.awayTeam.name}</h6>
                    </div>
                </div>
            </div>
          </div>
        </a>
        `;
      });

      document.getElementById("matches").innerHTML = matchHTML;
    });
}

const getMatchById = () => {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let matchId = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${base_url}v2/matches/${matchId}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let matchHTML = `
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">${data.match.competition.name}</span>
                    <div class="row">
                        <div class="col s6 m6">
                            <b>Home Team</b>
                            <h6>${data.match.homeTeam.name}</h6>
                        </div>
                        <div class="col s6 m6">
                            <b>Away Team</b>
                            <h6>${data.match.awayTeam.name}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="" />
              </div>
              <div class="card-content">
                <span class="card-title">Score</span>
                <table class="responsive-table">
                  <thead>
                      <tr>
                          <th></th>
                          <th><b>Home Team</b></th>
                          <th><b>Away Team</b></th>
                      </tr>
                  </thead>
                  
                  <tbody>
                      <tr>
                          <td>FullTime</td>
                          <td>${data.match.score.fullTime.homeTeam}</td>
                          <td>${data.match.score.fullTime.awayTeam}</td>
                      </tr>
                      <tr>
                          <td>HalfTime</td>
                          <td>${data.match.score.halfTime.homeTeam}</td>
                          <td>${data.match.score.halfTime.awayTeam}</td>
                      </tr>
                      <tr>
                          <td>ExtraTime</td>
                          <td>${data.match.score.extraTime.homeTeam}</td>
                          <td>${data.match.score.extraTime.awayTeam}</td>
                      </tr>
                      <tr>
                          <td>Penalties</td>
                          <td>${data.match.score.penalties.homeTeam}</td>
                          <td>${data.match.score.penalties.awayTeam}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;

            document.getElementById("body-content").innerHTML = matchHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(`${base_url}v2/matches/${matchId}`, {
      headers: {
        'X-Auth-Token': token
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        let matchHTML = `
          <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                  <span class="card-title">${data.match.competition.name}</span>
                  <div class="row">
                      <div class="col s6 m6">
                          <b>Home Team</b>
                          <h6>${data.match.homeTeam.name}</h6>
                      </div>
                      <div class="col s6 m6">
                          <b>Away Team</b>
                          <h6>${data.match.awayTeam.name}</h6>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="" />
            </div>
            <div class="card-content">
              <span class="card-title">Score</span>
              <table class="responsive-table">
                <thead>
                    <tr>
                        <th></th>
                        <th><b>Home Team</b></th>
                        <th><b>Away Team</b></th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>FullTime</td>
                        <td>${data.match.score.fullTime.homeTeam}</td>
                        <td>${data.match.score.fullTime.awayTeam}</td>
                    </tr>
                    <tr>
                        <td>HalfTime</td>
                        <td>${data.match.score.halfTime.homeTeam}</td>
                        <td>${data.match.score.halfTime.awayTeam}</td>
                    </tr>
                    <tr>
                        <td>ExtraTime</td>
                        <td>${data.match.score.extraTime.homeTeam}</td>
                        <td>${data.match.score.extraTime.awayTeam}</td>
                    </tr>
                    <tr>
                        <td>Penalties</td>
                        <td>${data.match.score.penalties.homeTeam}</td>
                        <td>${data.match.score.penalties.awayTeam}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;

        document.getElementById("body-content").innerHTML = matchHTML;
        resolve(data);
      });
  });
}

const getSavedMatches = () => {
  getAll().then(function (matches) {
    let matchesHTML = "";
    matches.forEach(function (match) {
      matchesHTML += `
                  <a href="../match.html?id=${match.id}&saved=true">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${match.competition.name}</span>
                            <div class="row">
                                <div class="col s6 m6">
                                    <b>Home Team</b>
                                    <h6>${match.homeTeam.name}</h6>
                                </div>
                                <div class="col s6 m6">
                                    <b>Away Team</b>
                                    <h6>${match.awayTeam.name}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                  </a>
                `;
    });

    document.getElementById("body-content").innerHTML = matchesHTML;
  });
}

const getSavedMatchById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = parseInt(urlParams.get("id"));

  getById(idParam).then(function (match) {
    let matchHTML = '';
    matchHTML = `
    <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <span class="card-title">${match.competition.name}</span>
            <div class="row">
                <div class="col s6 m6">
                    <b>Home Team</b>
                    <h6>${match.homeTeam.name}</h6>
                </div>
                <div class="col s6 m6">
                    <b>Away Team</b>
                    <h6>${match.awayTeam.name}</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="" />
      </div>
      <div class="card-content">
        <span class="card-title">Score</span>
        <table class="responsive-table">
          <thead>
              <tr>
                  <th></th>
                  <th><b>Home Team</b></th>
                  <th><b>Away Team</b></th>
              </tr>
          </thead>
          
          <tbody>
              <tr>
                  <td>FullTime</td>
                  <td>${match.score.fullTime.homeTeam}</td>
                  <td>${match.score.fullTime.awayTeam}</td>
              </tr>
              <tr>
                  <td>HalfTime</td>
                  <td>${match.score.halfTime.homeTeam}</td>
                  <td>${match.score.halfTime.awayTeam}</td>
              </tr>
              <tr>
                  <td>ExtraTime</td>
                  <td>${match.score.extraTime.homeTeam}</td>
                  <td>${match.score.extraTime.awayTeam}</td>
              </tr>
              <tr>
                  <td>Penalties</td>
                  <td>${match.score.penalties.homeTeam}</td>
                  <td>${match.score.penalties.awayTeam}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

    document.getElementById("body-content").innerHTML = matchHTML;
  });
}