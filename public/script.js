// Selecciono el formulario por su id
const form = document.getElementById('contratoForm');

// FUNCION PARA AGREGAR CLAUSULAS DINAMICAMENTE
function agregarClausula() {
  // Busco el contenedor donde van a ir las cláusulas
  const container = document.getElementById('clausulasContainer');
  
  // Creo un div que va a contener los inputs de la cláusula
  const div = document.createElement('div');
  
  // Defino el HTML de los inputs dentro del div
  // input para número de cláusula y input para el texto de la cláusula
  div.innerHTML = `
    <input type="text" name="numero" placeholder="Número" value="2">
    <input type="text" name="texto" placeholder="Texto de cláusula" value="Se deberá pagar la expensa mensual.">
  `;
  
  // Añado el div al contenedor de cláusulas
  container.appendChild(div);
}

// EVENTO AL ENVIAR EL FORMULARIO
form.addEventListener('submit', async (e) => {
  // Evito que el formulario se envíe de manera tradicional
  e.preventDefault();

  // Recojo los datos del formulario
  const formData = new FormData(form);
  const data = {};       // objeto que va a contener la info general
  const clausulas = [];  // array que va a contener todas las cláusulas

  // Recorro los datos del form
  formData.forEach((value, key) => {
    // Ignoro los campos de número y texto de cláusula por ahora
    if (key === 'numero' || key === 'texto') return;
    // Los demás campos los agrego al objeto data
    data[key] = value;
  });

  // Obtengo todos los números y textos de cláusulas
  const numeros = formData.getAll('numero');
  const textos = formData.getAll('texto');

  // Recorro cada cláusula y la agrego al array
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] && textos[i]) clausulas.push({ numero: numeros[i], texto: textos[i] });
  }

  // Agrego el array de cláusulas al objeto data
  data.clausulas = clausulas;

  // ENVIO LOS DATOS AL SERVIDOR PARA GENERAR EL CONTRATO
  try {
    const res = await fetch('/generar', {      // '/generar' es la ruta de tu backend
      method: 'POST',                           // uso POST porque envío datos
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)                // convierto el objeto a JSON
    });

    // Si hubo un error en la respuesta, tiro un error
    if (!res.ok) throw new Error('Error generando contrato');

    // Recibo el archivo generado como blob
    const blob = await res.blob();

    // Creo una URL temporal para descargar el archivo
    const url = window.URL.createObjectURL(blob);

    // Creo un enlace temporal para disparar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Contrato.docx'; // nombre del archivo que se descarga
    document.body.appendChild(a);
    a.click();  // simulo el click para descargar
    a.remove(); // elimino el enlace
  } catch (err) {
    console.error(err);   // muestro el error en consola
    alert('Error generando contrato'); // aviso al usuario
  }
});
