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
    const palabras = document.getElementById('inputPalabras').value.split(',').map(word => word.trim().toUpperCase());
    const ancho = parseInt(document.getElementById('ancho').value, 10);
    const largo = parseInt(document.getElementById('largo').value, 10);

    // Get the difficulty level
    const nivel = document.getElementById('nivel').value;

    // Generate the word search puzzle
    const sopa = generarSopa(palabras, ancho, largo, nivel);

    // Display the word search puzzle
    mostrarSopa(sopa, titulo);
  });

  // Function to generate the word search puzzle
  function generarSopa(palabras, ancho, largo, nivel) {
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
      // This will depend on the difficulty level
      switch(nivel) {
        case "facil":
          placeWordVertically(word);
          break;
        case "medio":
          placeWordVertically(word);
          placeWordHorizontally(word);
          break;
        case "dificil":
          placeWordVertically(word);
          placeWordHorizontally(word);
          placeWordDiagonally(word);
          break;
      }
    });

    // Function to place the word vertically in the word search puzzle
    function placeWordVertically(word) {
      const wordLength = word.length;
      const startRow = Math.floor(Math.random() * (largo - wordLength + 1));
      const startCol = Math.floor(Math.random() * ancho);

      for (let i = 0; i < wordLength; i++) {
        sopa[startRow + i][startCol] = word[i];
      }
    }

    // Function to place the word horizontally in the word search puzzle
    function placeWordHorizontally(word) {
      const wordLength = word.length;
      const startRow = Math.floor(Math.random() * largo);
      const startCol = Math.floor(Math.random() * (ancho - wordLength + 1));

      for (let i = 0; i < wordLength; i++) {
        sopa[startRow][startCol + i] = word[i];
      }
    }

    // Function to place the word diagonally in the word search puzzle
    function placeWordDiagonally(word) {
      const wordLength = word.length;
      const startRow = Math.floor(Math.random() * (largo - wordLength + 1));
      const startCol = Math.floor(Math.random() * (ancho - wordLength + 1));

      for (let i = 0; i < wordLength; i++) {
        sopa[startRow + i][startCol + i] = word[i];
      }
    }
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
    // Create a table element
    const table = document.createElement('table');

    // Iterate over each row in the word search puzzle
    sopa.forEach(row => {
      // Create a table row element
      const tr = document.createElement('tr');

      // Iterate over each cell in the row
      row.forEach(cell => {
        // Create a table cell element
        const td = document.createElement('td');
        // Set the cell content to the character
        td.textContent = cell;
        // Append the cell to the row
        tr.appendChild(td);
      });

      // Append the row to the table
      table.appendChild(tr);
    });

    // Clear the existing content in sopaGenerada
    sopaGenerada.innerHTML = '';

    // Append the table to sopaGenerada
    sopaGenerada.appendChild(table);
  }
});
