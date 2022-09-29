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
    let i = length - 1;
    let x = 0;
    let measureCount = 0;
    let dataSet = [];
    //24 measurements a day * 4 sets each
    while (i >= length - 96) {
      switch (body[i].type) {
        case "temperature":
          dataSet[x] = { ...dataSet[x], temperature: body[i] };
          measureCount++;
          break;
        case "wind speed":
          dataSet[x] = { ...dataSet[x], wind: body[i] };
          measureCount++;
          break;
        case "precipitation":
          dataSet[x] = { ...dataSet[x], precipitation: body[i] };
          measureCount++;
          break;
        case "cloud coverage":
          dataSet[x] = { ...dataSet[x], cloud: body[i] };
          measureCount++;
          break;
      }

      if (measureCount === 4) {
        x++;
        measureCount = 0;
      }
      i--;
    }
    //latest measurements of each kind
    const latest = dataSet[dataSet.length - 1];
    console.log(latest);

    //returns an array of just wind speed values
    const windMeasurements = dataSet.map((item) => item.wind.value);
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
  var selectingCity = document.getElementById("dropdown").value;
  temp(selectingCity);
  precip(selectingCity);
  wind(selectingCity);
};