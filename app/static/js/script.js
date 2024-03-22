// JavaScript code
let startBtn = document.getElementById('startStopBtn');
let hoverEnabled = false;

startBtn.addEventListener('click', function() {
    if (startBtn.innerText === 'Start') {
        startBtn.innerText = 'Stop';
        hoverEnabled = true;
        document.getElementById('arduinoStatus').innerText = 'Arduino: Running';
    } else {
        startBtn.innerText = 'Start';
        hoverEnabled = false;
        document.getElementById('arduinoStatus').innerText = 'Arduino: Stopped';
        document.getElementById('hoveredBox').innerText = 'Hovered Box: ';
        document.getElementById('currentPosition').innerText = 'Current Position: ';
    }
});

document.querySelectorAll('.grid-container').forEach(gridContainer => {
    gridContainer.addEventListener('mouseleave', () => {
        if (!hoverEnabled) {
            document.getElementById('hoveredBox').innerText = 'Hovered Box: ';
            document.getElementById('currentPosition').innerText = 'Current Position: ';
        }
    });
});

document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        if (hoverEnabled) {
            let hoveredBox = document.getElementById('hoveredBox');
            let currentPosition = document.getElementById('currentPosition');
            let coordinates = item.id.split('-');
            currentPosition.innerText = 'Current Position: ' + coordinates[1] + '*' + coordinates[0];
            console.log(item.id);

            fetch('/position', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ x: coordinates[1], y: coordinates[0] }) // Sending coordinates in the format (x, y)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Position sent to server successfully');
                } else {
                    console.error('Failed to send position to server');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
