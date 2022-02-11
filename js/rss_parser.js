const RSS_URL = `https://app.tcstenungsund.se/news.rss`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
      let summary = el.querySelector("description").innerHTML;
      let summaryArray = summary.split("&lt;img", 2);
      let imgArray = summaryArray[1].split("\"");
      html += `
        <div class="col-sm-6 col-lg-4 mb-4">
          <div class="card">
            <img src="${imgArray[1]}" width="100%" height="200" preserveAspectRatio="xMidYMid slice" focusable="false" alt="${imgArray[7]}">
            <div class="card-body">
              <h5 class="card-title">
                ${el.querySelector("title").innerHTML}
              </h5>
              <p class="iso8601">${el.querySelector("pubDate").innerHTML}</p>
              <p class="card-text">${summaryArray[0]}</p>
              <p><a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">Läs mer... <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6 p-1 border border-blue-600 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></p>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById('main_row').insertAdjacentHTML("beforeend", html);
  })
  .then(data => {
    var grid = document.getElementById('main_row');
    var msnry = new Masonry( grid, {
      percentPosition: true,
    })
  });
