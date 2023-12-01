// transformador.test.ts
import { transformarAEspanol } from './transformador';

describe('Transformador de API SWAPI', () => {
  test('Transformar datos en inglés a español', () => {
    const datosEnIngles = { name: 'Luke', height: '172', mass: '77', gender: 'male' };
    const datosEsperados = { nombre: 'Luke', altura: '172', masa: '77', género: 'male' };

    const datosTransformados = transformarAEspanol(datosEnIngles);

    expect(datosTransformados).toEqual(datosEsperados);
  });

  test('Transformar datos en inglés con atributos faltantes', () => {
    const datosEnIngles = { name: 'Leia', gender: 'female' };
    const datosEsperados = { nombre: 'Leia', género: 'female' };

    const datosTransformados = transformarAEspanol(datosEnIngles);

    expect(datosTransformados).toEqual(datosEsperados);
  });

  test('Manejar caso de atributo desconocido', () => {
    const datosEnIngles = { name: 'Han', unknownAttribute: 'valor' };
    const datosEsperados = { nombre: 'Han', unknownAttribute: 'valor' };

    const datosTransformados = transformarAEspanol(datosEnIngles);

    expect(datosTransformados).toEqual(datosEsperados);
  });

  test('Manejar caso de atributo nulo', () => {
    const datosEnIngles = { name: 'Chewbacca', height: null };
    const datosEsperados = { nombre: 'Chewbacca', altura: null };

    const datosTransformados = transformarAEspanol(datosEnIngles);

    expect(datosTransformados).toEqual(datosEsperados);
  });

});
