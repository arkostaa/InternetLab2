document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedBike = urlParams.get('bike');
  const bikeInfoElement = document.createElement('div');
  bikeInfoElement.innerText = 'Selected Bike: ' + selectedBike;

  document.body.appendChild(bikeInfoElement);
});
 
  document.getElementById('endButton').style.display = 'none';
  document.getElementById('tripDuration').style.display = 'none';

  const urlParams = new URLSearchParams(window.location.search);
  const selectedBike = urlParams.get('bike');
  if (selectedBike == "Navigator300") {
    bikeCosts = 150
  } else if (selectedBike == "Navigator500") {
    bikeCosts = 170
  } else if (selectedBike == "Navigator800") {
    bikeCosts = 200
  } else if (selectedBike == "Pilot205") {
    bikeCosts = 150
  } else {
    bikeCosts = 1000
  }
  
  const urlid = new URLSearchParams(window.location.search);
  const uniqueId = urlid.get('code');

  document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('endButton').style.display = 'block';
    document.getElementById('returnPoint').style.display = 'block';
    var startTime = new Date().getTime();
  
    document.getElementById('endButton').addEventListener('click', function() {
      document.getElementById('endButton').style.display = 'none';
      document.getElementById('returnPoint').style.display = 'none';


      var endTime = new Date().getTime();
      var duration = (endTime - startTime) / (1000 * 60 * 60);
      duration = Math.ceil(duration);
      var TotalCost = duration * bikeCosts;
  
      var durationText;
      if (duration === 1) {
        durationText = 'час';
      } else if (duration >= 2 && duration <= 4) {
        durationText = 'часа';
      } else {
        durationText = 'часов';
      }
      
      document.getElementById('tripDuration').innerText = 'Продолжительность поездки: ' + duration + ' ' + durationText;
      document.getElementById('TotalCost').innerText = 'Итоговая стоимость: ' + TotalCost + ' рублей';
      let selectedReturnPoint = document.getElementById('returnPoint').value;
      document.getElementById('tripDuration').style.display = 'block';

      fetch('/sendDuration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        duration: duration,
        money: TotalCost,
        returnPoint: selectedReturnPoint
        })
    }).then(response => {
        if(response.ok) {
            console.log(JSON.stringify({
              id: uniqueId,
              
              duration: duration,
              money: TotalCost
              }));
            console.log('Data submitted successfully');
        } else {
            console.log(JSON.stringify({
              duration: duration,
              money: TotalCost
              }));
            console.error('Failed to submit data');
        }
    });
  });
});
    