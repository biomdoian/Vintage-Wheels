// Fetch car data from the JSON Server
fetch('http://localhost:3000/cars')
    .then(response => response.json())
    .then(cars => {
        // GetS the references to HTML elements
        const carSelect = document.getElementById('car-select');
        const carImage = document.getElementById('car-image');
        const carSpecs = document.getElementById('car-specs');
        const carColors = document.getElementById('car-colors');
        const carHistory = document.getElementById('car-history');
        const carYears = document.getElementById('car-years');
        const reviewForm = document.getElementById('review-form');
        const submissionMessage = document.getElementById('submission-message');
        const nameInput = document.getElementById('name');
        const favoriteCarInput = document.getElementById('favorite-car');
        const reviewTextarea = document.getElementById('review');

        // This code populates the car selection dropdown
        cars.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = car.make + ' ' + car.model;
            carSelect.appendChild(option);
        });

        function displayCarDetails(car) {
            carImage.src = car.defaultImage; 

            // Displays all specs
            carSpecs.innerHTML = ''; 
            for (const key in car.specs) {
                carSpecs.innerHTML += `<p>${key}: ${car.specs[key]}</p>`;
            }

            carHistory.textContent = car.history;

            carYears.textContent = `(${car.yearStart} - ${car.yearEnd})`;

            //This code is to generate color swatches
            carColors.innerHTML = ''; 
            car.colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.classList.add('color-swatch', color.name.toLowerCase());
                swatch.addEventListener('click', () => {
                    carImage.src = color.image; // Changes the car image to selected color
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

        //This code handles the  car selection change event
        carSelect.addEventListener('change', (event) => {
            const selectedCarId = event.target.value;
            const selectedCar = cars.find(car => car.id === selectedCarId);

            if (selectedCar) {
                displayCarDetails(selectedCar);
            } else {
                clearCarDetails(); 
            }
        });

        // This code handles the  form submission
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            let isValid = true;

            // Checks if the name field is empty
            if (nameInput.value.trim() === '') {
                alert('Name is mandatory. Please enter your name.');
                isValid = false;
            }

            if (!isValid) {
                return; // Stop submission if validation fails
            }

            // If validation passes, proceed with submission (for now, display message)
            console.log('Form submitted successfully!'); 
            console.log('Name:', nameInput.value);
            console.log('Favorite Car:', favoriteCarInput.value);
            console.log('Review:', reviewTextarea.value);

            submissionMessage.style.display = 'block';
            reviewForm.reset();
            setTimeout(() => {
                submissionMessage.style.display = 'none';
            }, 3000);
        });

        // Displays the initial state (headers only, main image) when the page is loaded
        clearCarDetails();
    });