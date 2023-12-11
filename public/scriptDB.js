function generateLink(selectedBike) {
    var uniqueId = Math.random().toString(36).substr(2, 9);
    var url = './activation.html?code=' + uniqueId + '&bike=' + selectedBike;
    window.location.href = url;
    return uniqueId;
  }
document.getElementById('rentalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let selectedRentalPoint = document.getElementById('rentalPoint').value;
    let name = document.getElementById('name').value;
    let phoneNumber = document.getElementById('phone').value;
    let startTime = document.getElementById('start').value;
    let selectedBike = document.getElementById('selectedBike').textContent;
    let uniqueId = generateLink(selectedBike);
    fetch('/submitRentalData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: uniqueId,
            bike: selectedBike,
            rentalPoint: selectedRentalPoint,
            name: name,
            phone: phoneNumber,
            start: startTime,

        })
    }).then(response => {
        if(response.ok) {
            console.log('Data submitted successfully');
        } else {
          console.log (body);
            console.error('Failed to submit data');
        }
    });
});