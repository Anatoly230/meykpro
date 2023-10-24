if (navigator.geolocation) {
    var location_timeout = setTimeout(geolocFail, 10000);
    function geo_success(position) {
        clearTimeout(location_timeout);
        yourLat = position.coords.latitude;
        yourLng = position.coords.longitude;
        //alert(yourLat + " , " + yourLng);
    };
    function geo_error(error) {
        clearTimeout(location_timeout);
        if(error.code == 1) alert("Местоположение не определенно");
        if(error.code == 2) alert("Сеть не активна");
        if(error.code == 3) alert("Превышено время ожидания");
    };
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  } else {
    geolocFail();
  };
  function geolocFail(){
      alert("Ваш браузер не поддерживает гео-локацию");
  };
  