import inquirer from "inquirer";
import colors from "colors";

//funcion mostrar menu

const mostrarMenu = async () => {
  const preguntas = [
    {
      type: "list",
      name: "opciones",
      message: "¿Que desea hacer?",
      choices: [
        {
          value: 1,
          name: `${"01.".green} Buscar Ciudad`,
        },
        {
          value: 2,
          name: `${"02.".green} Historial`,
        },
        {
          value: 0,
          name: `${"0.".green} Salir`,
        },
      ],
    },
  ];

  console.clear();

  console.log("==============================================".green);
  console.log("             Selecione una Opcion".red);
  console.log("==============================================".green);

  const resultado = await inquirer.prompt(preguntas);
  return resultado;
};

//pausar
const pausa = async () => {
  const preguntas = [
    {
      type: "input",
      name: "enter",
      message: `Presione  ${"Enter".green} para continuar`,
    },
  ];

  await inquirer.prompt(preguntas);
};
//busca ciudad
const buscarCiudad = async () => {
  const preguntas = [
    {
      type: "input",
      name: "buscar",
      message: "Ciudad:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const resultado = await inquirer.prompt(preguntas);
  return resultado.buscar;
};

//muestra ciudades
const muestraCiudades = async (ciudades) => {
  console.clear();

  const { features } = ciudades;
  const choices = features.map((ciudad, i) => {
    let idx = i + 1;

    return {
      value: ciudad.id,
      name: `${colors.red(idx)}  ${ciudad.place_name}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${colors.red(0)} Cancelar`,
  });

  const preguntas = [
    {
      type: "list",
      name: "ciudad",
      message: "Selecciones lugar :",
      choices,
    },
  ];

  const resultado = await inquirer.prompt(preguntas);
  return resultado;
};

const infoCiudad = async (ciudades, climas) => {
  const { features } = ciudades;
  const clima = climas.main;

  const kelvin = clima.temp;

  const grados = parseInt(kelvin - 273.15);

  const kelvinMin = clima.temp_min;
  const gradosMin = parseInt(kelvinMin - 273.15);

  const kelvinMax = clima.temp_max;
  const gradosMax = parseInt(kelvinMax - 273.15);

  const id = features.find((ciudad) => {
    return ciudad.id;
  });

  console.log("Infromacion e la ciudad".green);
  console.log(`Ciudad : ${id.place_name.red}`);
  console.log(`Lat : ${colors.yellow(id.center[0])}`);
  console.log(`Lng : ${colors.yellow(id.center[1])}`);
  console.log(`Temperatura : ${colors.yellow(grados)} °C`);
  console.log(`Minimo : ${colors.yellow(gradosMin)} °C`);
  console.log(`Maximo : ${colors.yellow(gradosMax)} °C`);

  return id;
};

const listarHistorial = (listas) => {
  listas.forEach((lista, index) => {
    const id = index + 1;
    console.log(`${colors.red(id)}. ${colors.blue(lista.nombre)}`);
  });
};

export {
  mostrarMenu,
  pausa,
  muestraCiudades,
  buscarCiudad,
  infoCiudad,
  listarHistorial,
};
