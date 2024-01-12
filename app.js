// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the form element and the element where the generated word search puzzle will be displayed
  const form = document.querySelector('form');
  const sopaGenerada = document.getElementById('sopaGenerada');

  // Add a submit event listener to the form
  form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the input values from the form
    const titulo = document.getElementById('inputTitulo').value;
    const palabras = document.getElementById('inputPalabras').value.split(',').map(word => word.trim());
    const ancho = parseInt(document.getElementById('ancho').value, 10);
    const largo = parseInt(document.getElementById('largo').value, 10);

    // Generate the word search puzzle
    const sopa = generarSopa(palabras, ancho, largo);

    // Display the word search puzzle
    mostrarSopa(sopa, titulo);
  });

  // Function to generate the word search puzzle
  function generarSopa(palabras, ancho, largo) {
    // Create an empty matrix for the word search puzzle
    const sopa = [];
    for (let i = 0; i < largo; i++) {
      const row = [];
      for (let j = 0; j < ancho; j++) {
        // Generate a random character (uppercase letter) for each cell in the matrix
        const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        row.push(randomChar);
      }
      sopa.push(row);
    }

    // Place the words in the word search puzzle
    palabras.forEach(word => {
      // Logic to place the word in the word search puzzle
      // You can implement your own rules here
    });

    return sopa;
  }

  // Function to display the word search puzzle
  function mostrarSopa(sopa, titulo) {
    // Print the word search puzzle to the console
    console.log(`Sopa de letras: ${titulo}`);
    sopa.forEach(row => {
      console.log(row.join(' '));
    });

    // Display the word search puzzle in the DOM
    // You can improve this part to visualize the puzzle in your graphical interface
    sopaGenerada.innerText = row.join(' ');
  }
});
