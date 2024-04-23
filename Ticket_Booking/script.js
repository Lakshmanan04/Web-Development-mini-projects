document.addEventListener('DOMContentLoaded', function() {
    var ss = document.getElementById('ss');
    var submit = document.querySelector('button[type="submit"]');
    var form = document.getElementById('p');
    var movies = document.getElementById('movies');

    var seats = {
        movie1: { rows: 17, columns: 17 },
        movie2: { rows: 12, columns: 9 },
        movie3: { rows: 17, columns: 7 }
    };

    function generateSeats(movie) {
        ss.innerHTML = '';

        var rows = seats[movie].rows;
        var columns = seats[movie].columns;

        ss.style.gridTemplateColumns = `repeat(${columns}, 20px)`;
        ss.style.gridTemplateRows = `repeat(${rows}, 20px)`;

        function toggleSeatSelection(seat) {
            seat.classList.toggle('selected');
        }

        for (var i = 0; i < rows * columns; i++) {
            var seat = document.createElement('div');
            seat.classList.add('seat');
            seat.addEventListener('click', function() {
                toggleSeatSelection(this);
            });
            ss.appendChild(seat);
        }
    }

    generateSeats(movies.value);
    movies.addEventListener('change', function() {
        generateSeats(this.value);
    });

    var tq = document.getElementById('tickets');
    tq.addEventListener('change', function() {
        if (tq.value <= 0) alert("Please enter a valid number of seats");
    });

    form.addEventListener('submit', function() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;

        if (name === '' || email === '' || phone === '') {
            alert('Please fill out all fields.');
            return;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        if (phone.length != 10 || isNaN(phone) || phone < 0) {
            alert('Please enter a valid phone number.');
            return;
        }
        alert('Reservation Confirmed!');
    });
});
