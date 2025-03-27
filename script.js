// Fetch car data from the JSON Server
fetch('http://localhost:3000/cars')
    .then(response => response.json())
    .then(cars => {
        // Gets the references to HTML elements
        const carSelect = document.getElementById('car-select');
        const carImage = document.getElementById('car-image');
        const carSpecs = document.getElementById('car-specs');
        const carColors = document.getElementById('car-colors');
        const carHistory = document.getElementById('car-history');
        const carYears = document.getElementById('car-years');
        const reviewForm = document.getElementById('review-form');
        const submissionMessage = document.getElementById('submission-message');
        const nameInput = document.getElementById('name');
        const preferredCarInput = document.getElementById('preferred-car');
        const leastAppealingCarInput = document.getElementById('least-appealing-car');

        // Populates the car selection dropdown
        cars.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = car.make + ' ' + car.model;
            carSelect.appendChild(option);
        });

        // Function to display car details
        function displayCarDetails(car) {
            carImage.src = car.defaultImage;
            carSpecs.innerHTML = '';
            for (const key in car.specs) {
                carSpecs.innerHTML += `<p>${key}: ${car.specs[key]}</p>`;
            }
            carHistory.textContent = car.history;
            carYears.textContent = `(${car.yearStart} - ${car.yearEnd})`;
            carColors.innerHTML = '';
            car.colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.classList.add('color-swatch', color.name.toLowerCase());
                swatch.addEventListener('click', () => {
                    carImage.src = color.image;
                });
                carColors.appendChild(swatch);
            });
        }

        // Function to clear car details
        function clearCarDetails() {
            carImage.src = 'images/vintage-wheels-main.jpg';
            carSpecs.innerHTML = '';
            carHistory.textContent = '';
            carYears.textContent = '';
            carColors.innerHTML = '';
        }

        // Handles car selection change event
        carSelect.addEventListener('change', (event) => {
            const selectedCarId = event.target.value;
            const selectedCar = cars.find(car => car.id === selectedCarId);

            if (selectedCar) {
                displayCarDetails(selectedCar);
            } else {
                clearCarDetails();
            }
        });

        // Handles form submission
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            let isValid = true;

            // Checks if the name field is empty
            if (nameInput.value.trim() === '') {
                alert('Name is mandatory. Please enter your name.');
                isValid = false;
            }
            // Checks if both preferred and least appealing car fields are empty
            const preferredCarValue = preferredCarInput.value.trim();
            const leastAppealingCarValue = leastAppealingCarInput.value.trim();

            if (preferredCarValue === '' && leastAppealingCarValue === '') {
                alert('Please fill at least one of the "Preferred Vintage Car" or "Least Preferred Vintage Car" boxes.');
                isValid = false;
            }

            if (!isValid) {
                return; // Stops the submission if validation fails
            }

            // If validation passes, proceed with submission (for now, display message)
            console.log('Form submitted successfully!'); 
            console.log('Name:', nameInput.value);
            console.log('Preferred Vintage Car:', preferredCarInput.value);
            console.log('Least Preferred Vintage Car:', leastAppealingCarInput.value);

            submissionMessage.style.display = 'block';
            reviewForm.reset();
            setTimeout(() => {
                submissionMessage.style.display = 'none';
            }, 3000);
        });

        // Display the initial state (headers only, main image) on load
        clearCarDetails();
    });




