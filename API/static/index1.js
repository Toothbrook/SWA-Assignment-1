const temp = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8080/data/${city}`);
  xhr.onload = () => {
    const response = xhr.responseText;
    const body = JSON.parse(response);
    const length = body.length;
    var minim = body[0].value;
    var maxim = body[0].value;

    for (let i =0; i< length; i++) {
      if (body[i].type === "temperature") {
        if (body[i].value < minim) {
          minim = body[i].value;
        }
        if (body[i].value > maxim) {
          maxim = body[i].value;
        }
      }
    }
    document.getElementById("minT").innerText = minim + ' degrees C';
    document.getElementById("maxT").innerText = maxim + ' degrees C';
  };
  xhr.onerror = () => {
    console.log("An error has occured.");
  };
  xhr.send();
};

const precip = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8080/data/${city}`);
  xhr.onload = () => {
    const response = xhr.responseText;
    const body = JSON.parse(response);
    var sum = 0;
    const length = body.length;

    for (let i =0; i< length; i++) {
      if (body[i].type === "precipitation") {
        sum = sum + body[i].value;
      }
    }
    document.getElementById("totalP").innerText = sum.toString().slice(0,7) + ' mm';
  };
  xhr.onerror = () => {
    console.log("An error has occured");
  };
  xhr.send();
};

const wind = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8080/data/${city}`);
  xhr.onload = () => {
    const response = xhr.responseText;
    const body = JSON.parse(response);
    const length = body.length;
    let i = length-1;
    let x = 0;
    let count = 0;
    let values = [];
    //24 measurements a day * 4 sets each
    while(i>=length - 96) {
      switch (body[i].type) {
        case "temperature":
          values[x] = { ...values[x], temperature: body[i] };
          count++;
          break;
        case "wind speed":
          values[x] = { ...values[x], wind: body[i] };
          count++;
          break;
        case "precipitation":
          values[x] = { ...values[x], precipitation: body[i] };
          count++;
          break;
        case "cloud coverage":
          values[x] = { ...values[x], cloud: body[i] };
          count++;
          break;
      }

      if (count === 4) {
        x++;
        count = 0;
      }
      i--;
    }
    const latest = values[values.length - 1];

    //returns an array of just wind speed values
    const windMeasurements = values.map((item) => item.wind.value);
    const avgWindSpeed =
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
      windMeasurements.reduce((item, prev) => item + prev) / 24;
    document.getElementById("averageW").innerText = avgWindSpeed.toString().slice(0,5) + ' m/s';
    console.log(avgWindSpeed);
  };
  xhr.onerror = () => {
    console.log("An error has occured.");
  };
  xhr.send();
};

const showForecast = () => {
  var city = document.getElementById("dropdown").value;
  temp(city);
  precip(city);
  wind(city);
};