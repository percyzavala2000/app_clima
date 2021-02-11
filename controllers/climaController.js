import { mostrarMenu, pausa } from "../views/inquirer.js";
import { localizacionApi, apiClima } from "../models/Api.js";
import {
  muestraCiudades,
  buscarCiudad,
  infoCiudad,
  listarHistorial,
} from "../views/inquirer.js";
import { guardarBD, mostrarHistorial } from "../models/guardarArchivo.js";

const controladorClima = async () => {
  let opt;
  let ciudadID;

  const leerArchivo = await mostrarHistorial();

  do {
    opt = await mostrarMenu();
    //evaluar opciones
    switch (opt.opciones) {
      case 1:
        const buscar = await buscarCiudad();
        //resultado de apis
        const apiLocalizacion = await localizacionApi(buscar);
        //muestra ciudad
        await muestraCiudades(apiLocalizacion);
        const resultadoClima = await apiClima(apiLocalizacion);
        //muestra informacion
        ciudadID = await infoCiudad(apiLocalizacion, resultadoClima);
        guardarBD(ciudadID);

        break;

      case 2:
        console.log("Historial");
        listarHistorial(leerArchivo);

        break;

      default:
        break;
    }

    await pausa();
  } while (opt.opciones !== 0);
};

export { controladorClima };
