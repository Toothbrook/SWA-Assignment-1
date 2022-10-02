
const latest = (city) => {
  fetch(`http://localhost:8080/data/${city}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res : Promise.reject(res.statusText)))
    .then((res) => res.json())
    .then((body) => {
      const length = body.length;
      let j = 0;
      let count = 0;
      let values = [];

      for (let i = 0; i < length; i++) {
        switch (body[i].type) {
          case "temperature":
            values[j] = { ...values[j], temperature: body[i] };
            count++;
            break;

          case "precipitation":
            values[j] = { ...values[j], precipitation: body[i] };
            count++;
            break;

          case "wind speed":
            values[j] = { ...values[j], wind: body[i] };
            count++;
            break;

          case "cloud coverage":
            values[j] = { ...values[j], cloud: body[i] };
            count++;
            break;
        }

        if (count == 4) {
          j++;
          count = 0
        }

      }

      const latestValues = values[values.length - 1];

      document.getElementById('temp').innerText = `${latestValues.temperature.value}` + ' degrees C';
      document.getElementById('precip').innerText = `${latestValues.precipitation.value}` + ' mm';
      document.getElementById('wind').innerText = `${latestValues.wind.value}` + ' m/s';
      document.getElementById('cloud').innerText = `${latestValues.cloud.value}` + '%';
    });
};

const next24Hours = (city) => {
  fetch(`http://localhost:8080/forecast/${city}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => (res.ok ? res : Promise.reject(res.statusText)))
    .then((res) => res.json())
    .then((body) => {
      //TODO
      const length = body.length;
      let j = 0;
      let count = 0;
      let values = [];

      for (let i = 0; i < length; i++) {
        switch (body[i].type) {
          case "temperature":
            values[j] = { ...values[j], temperature: body[i] };
            count++;
            break;

          case "precipitation":
            values[j] = { ...values[j], precipitation: body[i] };
            count++;
            break;

          case "wind speed":
            values[j] = { ...values[j], wind: body[i] };
            count++;
            break;

          case "cloud coverage":
            values[j] = { ...values[j], cloud: body[i] };
            count++;
            break;
        }

        if (count == 4) {
          j++;
          count = 0
        }
      }
      
      let temperature='',precipitation='',wind='',cloud = '',time='';

      for (let index = 0; index < values.length; index++) {

        time += '\r\n\r\n' + `${values[index].temperature.time}`
        temperature += '\r\n\r\n' + 'from ' + `${values[index].temperature.from}` + '  °C ' + 'to ' + `${values[index].temperature.to}` + '  °C';
        precipitation += '\r\n\r\n' +'from ' + `${values[index].precipitation.from}` + ' mm ' + 'to ' +`${values[index].precipitation.to}` + ' mm';
        wind += '\r\n\r\n' +'from ' + `${values[index].wind.from}`+ ' m/s ' + 'to ' +`${values[index].wind.to}`+ ' m/s';
        cloud += '\r\n\r\n' + 'from ' + `${values[index].cloud.from}` +'% ' + 'to ' +`${values[index].cloud.to}`+ '%' ;

      }
      document.getElementById('datetimeForecast').innerText = time;
      document.getElementById('tempForecast').innerText = temperature;
      document.getElementById('precipForecast').innerText = precipitation;
      document.getElementById('windForecast').innerText = wind;
      document.getElementById('cloudForecast').innerText = cloud;

    });

}

const showForecast = () => {
  var city = document.getElementById('dropdown').value;
  latest(city);
  next24Hours(city);
}