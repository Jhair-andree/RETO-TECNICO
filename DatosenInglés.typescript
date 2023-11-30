// transformador.ts
type DatosEnIngles = { [key: string]: string };

const mapeoInglesEspanol: { [key: string]: string } = {
  name: 'nombre',
  height: 'altura',
  mass: 'masa',
};

export function transformarAEspanol(datosEnIngles: DatosEnIngles): DatosEnIngles {
  const datosEnEspanol: DatosEnIngles = {};

  for (const [clave, valor] of Object.entries(datosEnIngles)) {
    const claveEspanol = mapeoInglesEspanol[clave] || clave;
    datosEnEspanol[claveEspanol] = valor;
  }

  return datosEnEspanol;
}
