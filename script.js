// Fetch car data from the JSON Server
fetch('http://localhost:3000/cars')
    .then(response => response.json())
    .then(cars => {
        // Get references to HTML elements
        const carSelect = document.getElementById('car-select');
        const carImage = document.getElementById('car-image');
        const carSpecs = document.getElementById('car-specs');
        const carColors = document.getElementById('car-colors');
        const carHistory = document.getElementById('car-history');
        const carYears = document.getElementById('car-years');
        const reviewForm = document.getElementById('review-form');
        const submissionMessage = document.getElementById('submission-message');

        // Populate the car selection dropdown
        cars.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = car.make + ' ' + car.model;
            carSelect.appendChild(option);
        });

        // Function to display car details
        function displayCarDetails(car) {
            carImage.src = car.defaultImage; // Display the default image

            // Display all specs
            carSpecs.innerHTML = ''; // Clear previous specs
            for (const key in car.specs) {
                carSpecs.innerHTML += `<p>${key}: ${car.specs[key]}</p>`;
            }

            carHistory.textContent = car.history;

            carYears.textContent = `(${car.yearStart} - ${car.yearEnd})`;

            // Generate color swatches
            carColors.innerHTML = ''; // Clear previous colors
            car.colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.classList.add('color-swatch', color.name.toLowerCase());
                swatch.addEventListener('click', () => {
                    carImage.src = color.image; // Change car image to selected color
                });
                carColors.appendChild(swatch);
            });
        }

        // Function to clear car details
        function clearCarDetails() {
            carImage.src = 'images/vintage-wheels-main.jpg'; // Set main vintage wheels image
            carSpecs.innerHTML = '';
            carHistory.textContent = '';
            carYears.textContent = '';
            carColors.innerHTML = '';
        }

        // Handle car selection change event
        carSelect.addEventListener('change', (event) => {
            const selectedCarId = event.target.value;
            const selectedCar = cars.find(car => car.id === selectedCarId);

            if (selectedCar) {
                displayCarDetails(selectedCar);
            } else {
                clearCarDetails(); // Clear details if no car is selected
            }
        });

        // Handle form submission
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            // You could add code here to actually send the data to a server
            // For now, we'll just display the success message

            submissionMessage.style.display = 'block';
            reviewForm.reset(); // Clear the form
            setTimeout(() => {
                submissionMessage.style.display = 'none'; // Hide the message after a few seconds
            }, 3000);
        });

        // Display the initial state (headers only, main image) on load
        clearCarDetails();
    });
