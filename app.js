document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const sopaGenerada = document.getElementById('sopaGenerada');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('inputTitulo').value;
    const palabras = document.getElementById('inputPalabras').value.split(',').map(word => word.trim());
    const ancho = parseInt(document.getElementById('ancho').value, 10);
    const largo = parseInt(document.getElementById('largo').value, 10);

    const sopa = generarSopa(palabras, ancho, largo);
    mostrarSopa(sopa, titulo);
  });

  function generarSopa(palabras, ancho, largo) {
    // Lógica para generar la matriz de la sopa de letras con palabras
    // Puedes implementar tus propias reglas aquí

    // Por ahora, solo crea una matriz de tamaño ancho x largo con caracteres aleatorios
    const sopa = [];
    for (let i = 0; i < largo; i++) {
      const row = [];
      for (let j = 0; j < ancho; j++) {
        const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        row.push(randomChar);
      }
      sopa.push(row);
    }

    // Coloca las palabras en la sopa
    palabras.forEach(word => {
      // Lógica para colocar la palabra en la sopa
      // Puedes implementar tus propias reglas aquí
    });

    return sopa;
  }

  function mostrarSopa(sopa, titulo) {
    // Lógica para mostrar la sopa de letras en el DOM
    // Puedes implementar tus propias reglas aquí

    // Por ahora, simplemente imprime la matriz en la consola
    console.log(`Sopa de letras: ${titulo}`);
    sopa.forEach(row => {
      console.log(row.join(' '));
    });

    // Puedes mejorar esta parte para visualizar la sopa en tu interfaz gráfica
    sopaGenerada.innerText = `¡Sopa de letras generada! Mira la consola para más detalles.`;
  }
});
