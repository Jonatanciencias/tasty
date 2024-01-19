// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el formulario y el elemento donde se mostrará la sopa de letras generada
  const form = document.querySelector('form');
  const sopaGenerada = document.getElementById('sopaGenerada');

  // Agregar un evento de envío al formulario
  form.addEventListener('submit', function (event) {
    // Prevenir el comportamiento de envío predeterminado del formulario
    event.preventDefault();

    // Obtener los valores de entrada del formulario
    const titulo = document.getElementById('inputTitulo').value;
    const palabras = document.getElementById('inputPalabras').value.split(',').map(word => word.trim().toUpperCase());
    const ancho = parseInt(document.getElementById('ancho').value, 10);
    const largo = parseInt(document.getElementById('largo').value, 10);

    // Obtener el nivel de dificultad
    const nivel = document.getElementById('nivel').value;

    // Lamado a la funcion para generar la sopa de letras
    const sopa = generarSopa(palabras, ancho, largo, nivel);

    // LLamado a la funcion para mostrar la sopa de letras
    mostrarSopa(sopa, titulo);
  });

  // Función para generar la sopa de letras
  function generarSopa(palabras, ancho, largo, nivel) {
    // Crear una matriz vacía para la sopa de letras
    const sopa = [];
    for (let i = 0; i < largo; i++) {
      const row = [];
      for (let j = 0; j < ancho; j++) {
        // Generar un carácter aleatorio (letra mayúscula) para cada celda en la matriz
        const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        row.push(randomChar);
      }
      sopa.push(row);
    }
  
    // Colocar las palabras en la sopa de letras
    palabras.forEach(word => {
      // Lógica para colocar la palabra en la sopa de letras
      // Esto dependerá del nivel de dificultad
      switch(nivel) {
        case "facil":
          colocarPalabraVerticalmente(word);
          break;
        case "medio":
          colocarPalabraVerticalmente(word);
          colocarPalabraHorizontalmente(word);
          break;
        case "dificil":
          colocarPalabraVerticalmente(word);
          colocarPalabraHorizontalmente(word);
          colocarPalabraDiagonalmente(word);
          break;
      }
    });

    // Función para colocar la palabra verticalmente en la sopa de letras
    function colocarPalabraVerticalmente(word) {
      const wordLength = word.length;
      const startRow = Math.floor(Math.random() * (largo - wordLength + 1));
      const startCol = Math.floor(Math.random() * ancho);

      for (let i = 0; i < wordLength; i++) {
        sopa[startRow + i][startCol] = word[i];
      }
    }

    // Función para colocar la palabra horizontalmente en la sopa de letras
    function colocarPalabraHorizontalmente(word) {
      const wordLength = word.length;
      const startRow = Math.floor(Math.random() * largo);
      const startCol = Math.floor(Math.random() * (ancho - wordLength + 1));

      for (let i = 0; i < wordLength; i++) {
        sopa[startRow][startCol + i] = word[i];
      }
    }

    // Función para colocar la palabra diagonalmente en la sopa de letras
    function colocarPalabraDiagonalmente(word) {
      const wordLength = word.length;
      const startRow = Math.floor(Math.random() * (largo - wordLength + 1));
      const startCol = Math.floor(Math.random() * (ancho - wordLength + 1));

      for (let i = 0; i < wordLength; i++) {
        sopa[startRow + i][startCol + i] = word[i];
      }
    }
    return sopa;
  }


  // Función para mostrar la sopa de letras
  function mostrarSopa(sopa, titulo) {
    // Imprimir la sopa de letras en la consola
    console.log(`Sopa de letras: ${titulo}`);
    sopa.forEach(row => {
      console.log(row.join(' '));
    });

    // Mostrar la sopa de letras en el DOM
    // Crear un elemento de tabla
    const table = document.createElement('table');

    // Iterar sobre cada fila en la sopa de letras
    sopa.forEach(row => {
      // Crear un elemento de fila de tabla
      const tr = document.createElement('tr');

      // Iterar sobre cada celda en la fila
      row.forEach(cell => {
        // Crear un elemento de celda de tabla
        const td = document.createElement('td');
        // Establecer el contenido de la celda como el carácter
        td.textContent = cell;
        // Agregar la celda a la fila
        tr.appendChild(td);
      });

      // Agregar la fila a la tabla
      table.appendChild(tr);
    });

    // Borrar el contenido existente en sopaGenerada
    sopaGenerada.innerHTML = '';

    // Agregar la tabla a sopaGenerada
    sopaGenerada.appendChild(table);
  }
});
