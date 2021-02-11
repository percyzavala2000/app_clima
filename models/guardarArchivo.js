import fs from "fs";

let lista = [];
const guardarBD = async (ciudadID) => {
  const datos = {
    id: ciudadID.id,
    nombre: ciudadID.place_name,
  };
  lista = [...lista, datos];

  try {
    await fs.writeFileSync("./db/archivos.json", JSON.stringify(lista));
    console.log("Guardo correctamente");
  } catch (error) {
    console.log("El error al guardar", error);
  }
};

const mostrarHistorial = async () => {
  //si no exites
  if (!fs.existsSync("./db/archivos.json")) {
    null;
  }

  const respuesta = await fs.readFileSync("./db/archivos.json", {
    encoding: "utf-8",
  });
  const leerArchivo = JSON.parse(respuesta);

  cargarArchivo(leerArchivo);
  return leerArchivo;
};

const cargarArchivo = (leerArchivo) => {
  if (leerArchivo) {
    leerArchivo.forEach((caragr) => {
      if (caragr.id === leerArchivo.id) {
        null;
      } else {
        lista = [...lista, caragr];
      }
    });
  }
};

export { guardarBD, mostrarHistorial, cargarArchivo };
