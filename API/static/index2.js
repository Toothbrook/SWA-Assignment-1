
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

        for(let i=0; i<length; i++)
        {
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
              
            if(count == 4){
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
        });

}

const showForecast = ()=>{
    var city = document.getElementById('dropdown').value;
    latest(city);
    next24Hours(city);
}