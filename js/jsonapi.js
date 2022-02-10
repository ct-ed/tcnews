fetch('https://app.tcstenungsund.se/jsonapi/node/news')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.data)
    data.data.forEach(data => {
      document.getElementById("main-container").innerHTML += data.attributes.body.processed
    });
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });
