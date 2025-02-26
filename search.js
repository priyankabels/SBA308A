export function renderSearch(data)
{
let strInfo = "";

  data.forEach((info) => {
    let strInfo = `<table>`;

    strInfo += `<tr><td style="padding: 8px; text-align: left; width: 20%;"><b>${info.name}</b></td></tr>`;
    strInfo += `<tr><td colspan="2" style="padding: 8px; text-align: left; width: 30%;"><img src=${
      info.imageUrl
    } alt="img" width=30% height=30%/></td><td colspan="2" style="padding: 8px; text-align: left; width: 30%;"><b>Films:</b>${
      info.films && info.films.length > 0 ? info.films : "None Available"
    }</td><td colspan="2" style="padding: 8px; text-align: left; width: 30%;"><b>TV Shows:</b>${
      info.tvShows && info.tvShows.length > 0 ? info.tvShows : "None Available"
    }</td><tr/>`;
    strInfo += `<tr><td colspan="3" style="padding: 8px; text-align: left; width: 20%;"><a href=${info.sourceUrl}>Source URL</a></td><tr/>`;
    strInfo += `</table>`;
    searchDisplay.innerHTML += strInfo;
  });
}