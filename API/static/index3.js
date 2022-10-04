

const sendingData = () => {
    const temp = document.getElementById("temp").value;

    const data = `{
        "type": "temperature",
        "value": ${temp},
        "place": "Horsens",
        "unit": "C"
    }`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:8080/data`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
      console.log(xhr.responseText);
      
    };
    xhr.onerror = () => {
      console.log("An error has occured.");
    };
    xhr.send(data);

    if(temp != "")
    {
        document.getElementById('confirmation').innerText = "Data added successfully";
    }
    else {
        document.getElementById('confirmation').innerText = "";
    }
    };