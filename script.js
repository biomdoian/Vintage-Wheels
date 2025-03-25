// Fetch car data from the JSON Server
fetch('http://localhost:4000/cars')
  .then(response => response.json())
  .then(cars => {
    // Get references to HTML elements
    const carSelect = document.getElementById('car-select');
    const carImage = document.getElementById('car-image');
    const carSpecs = document.getElementById('car-specs');
    const carColors = document.getElementById('car-colors');
    const carHistory = document.getElementById('car-history');
    const carYears = document.getElementById('car-years');

    // Populate the car selection dropdown
    cars.forEach(car => {
      const option = document.createElement('option');
      option.value = car.id;
      option.textContent = car.make + ' ' + car.model;
      carSelect.appendChild(option);
    });

    // Function to display car details
    function displayCarDetails(car) {
      carImage.src = car.images[0]; // Display the first image

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

    // Handle car selection change event
    carSelect.addEventListener('change', (event) => {
      const selectedCarId = event.target.value;
      const selectedCar = cars.find(car => car.id === selectedCarId);

      if (selectedCar) {
        displayCarDetails(selectedCar);
      }
    });

    // Display the first car on load
    if (cars.length > 0) {
      displayCarDetails(cars[0]);
    }
  });

