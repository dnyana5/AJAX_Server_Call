
function makePromiseCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function() { 
        //whatever connection changes happens it gives us call back
      console.log(methodType+ " State Changed Called.Readu State: " + xhr.readyState +
                                " Status: "+xhr.status);
           if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                  resolve(xhr.responseText);
            }else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
              reject({
                  status: xhr.status,
                  statusText: xhr.statusText
              });
              console.log("Handle 400 Client Error or 500 Server Error");
          }
      }
      xhr.onerror = function () {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
      };
      xhr.open(methodType, url, async); // opens connection
      if(data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
      }else xhr.send();
        console.log(methodType+" request sent to the server");
  });
}

