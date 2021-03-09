let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() { 
          //whatever connection changes happens it gives us call back
            if (xhr.readyState === 4) {
              //Matching all 200 Series Responses
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                }else if (xhr.status >= 400) {
                  reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                  });
                    console.log("Handle 400 Client Error or 500 Server Error ");
              }
            }
        }
        xhr.open(methodType, url, async); // open connection
        if(data) {
          console.log(JSON.stringify(data));
          xhr.setRequestHeader("Content-Type","application/json");
          xhr.send(JSON.stringify(data));
        }else xhr.send();
          console.log(methodType+" request sent to the server");
  });
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
        .then(responseText => {
          console.log("Get User Data: "+responseText)
        })
        .catch(error => console.log("GET Error Status: " +JSON.stringify(error)));
  
const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
        .then(responseText =>{
          console.log("User Deleted : " + responseText);
        })
        .catch(error =>console.log("DELETE Error Status: " +JSON.stringify(error)));



const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary": "5000"};
makePromiseCall("POST", postURL,true, emplData) 
        .then(responseText =>{
        console.log("User Added : " + responseText);
        })
        .catch(error =>console.log("POST Error Status: " +JSON.stringify(error)));

