// ===== Utilidades =====
// Muestra un mensaje en una caja de resultados.
// estado: 'ok' (verde) o 'error' (coral)
function mostrar(id, html, estado) {
  const caja = document.getElementById(id);
  caja.className = 'resultado ' + estado;
  caja.innerHTML = html;
}

// Evita que lo que escribe el usuario se interprete como HTML
function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ===== 1. Votación por sección utilizando Switch =====
function votar() {
  const nombre = document.getElementById('nombre').value.trim();
  const ciudad = document.getElementById('ciudad').value;
  const seccionRadio = document.querySelector('input[name="seccion"]:checked');

  if (!nombre || !ciudad || !seccionRadio) {
    mostrar('resEncuesta', 'Completa tu nombre, tu ciudad y elige una sección para votar.', 'error');
    return;
  }

  let mensajeSeccion = '';

  // Uso de Switch para evaluar la sección elegida
  switch (seccionRadio.value) {
    case 'Norte':
      mensajeSeccion = 'Sección Norte';
      break;
    case 'Sur':
      mensajeSeccion = 'Sección Sur';
      break;
    case 'Centro':
      mensajeSeccion = 'Sección Centro';
      break;
    default:
      mensajeSeccion = 'Sección no especificada';
  }

  mostrar('resEncuesta',
    `¡Gracias ${escapar(nombre)}! Ciudad: ${ciudad}. Tu voto fue registrado en la <strong>${mensajeSeccion}</strong>.`,
    'ok');
}

// ===== 2. Suma interactiva de números positivos (termina con <= 0) =====
function sumarPositivos() {
  let suma = 0;
  let count = 0;
  let num;
  do {
    const input = prompt('Ingresa un número positivo (0 o un número negativo para finalizar):');
    if (input === null) break;
    num = parseFloat(input);
    if (!isNaN(num) && num > 0) {
      suma += num;
      count++;
    }
  } while (!isNaN(num) && num > 0);

  mostrar('resSuma',
    `Se sumaron <strong>${count}</strong> números.<br>Total = <strong>${suma}</strong>`,
    'ok');
}

// ===== 3. Ordenar 3 números de mayor a menor =====
function compararNumeros() {
  const n1 = parseFloat(document.getElementById('num1').value);
  const n2 = parseFloat(document.getElementById('num2').value);
  const n3 = parseFloat(document.getElementById('num3').value);

  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    mostrar('resMayor', 'Ingresa los 3 números en los campos.', 'error');
    return;
  }

  const arr = [n1, n2, n3].sort((a, b) => b - a);
  mostrar('resMayor',
    `De mayor a menor:<br><strong>${arr.join(' &gt; ')}</strong>`,
    'ok');
}

// ===== 4. Cálculo de importe neto =====
function calcularImporte() {
  const bruto = parseFloat(document.getElementById('importeBruto').value);

  if (isNaN(bruto) || bruto <= 0) {
    mostrar('resImporte', 'Ingresa un importe bruto mayor a 0.', 'error');
    return;
  }

  const tasa = bruto > 15000 ? 0.16 : 0.10;
  const impuestos = bruto * tasa;
  const neto = bruto - impuestos;

  mostrar('resImporte',
    `Importe bruto: €${bruto.toFixed(2)}<br>` +
    `Impuestos (${Math.round(tasa * 100)}%): €${impuestos.toFixed(2)}<br>` +
    `<strong>Importe neto: €${neto.toFixed(2)}</strong>`,
    'ok');
}

// ===== 5. Calculadora de sueldo con aumentos por antigüedad =====
function calcularSueldo() {
  const ant = parseFloat(document.getElementById('antiguedad').value);
  const base = 40000;

  if (isNaN(ant) || ant < 0) {
    mostrar('resSueldo', 'Ingresa una cantidad de años válida (0 o más).', 'error');
    return;
  }

  let pct = 0;
  if (ant > 10) pct = 0.10;
  else if (ant > 5) pct = 0.07;
  else if (ant > 3) pct = 0.05;
  else pct = 0.03;

  const aumento = base * pct;
  const sueldoTotal = base + aumento;

  mostrar('resSueldo',
    `Con ${ant} años de antigüedad:<br>` +
    `Sueldo base: €${base.toLocaleString()}<br>` +
    `Aumento (${Math.round(pct * 100)}%): +€${aumento.toLocaleString()}<br>` +
    `<strong>Sueldo final: €${sueldoTotal.toLocaleString()}</strong>`,
    'ok');
}

// ===== Ciclos: suma de impares del 1 al 100 =====
function sumarImpares() {
  let suma = 0;
  for (let i = 1; i <= 100; i += 2) {
    suma += i;
  }
  mostrar('resImpares', `Suma de impares del 1 al 100: <strong>${suma}</strong>`, 'ok');
}

// ===== Ciclos: imprimir asteriscos =====
function generarAsteriscos() {
  const cant = parseInt(document.getElementById('cantAsteriscos').value);

  if (isNaN(cant) || cant <= 0) {
    mostrar('resAsteriscos', 'Ingresa una cantidad mayor a 0.', 'error');
    return;
  }

  let cadena = '';
  for (let i = 0; i < cant; i++) {
    cadena += '* ';
  }
  mostrar('resAsteriscos',
    `Asteriscos generados (${cant}):<br><span class="asteriscos">${cadena}</span>`,
    'ok');
}
