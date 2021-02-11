import axios from "axios";

const localizacionApi = async (ciudad) => {
  const lugar = ciudad;

  const clave =
    "pk.eyJ1IjoicGVyY3l6YXZhbGEiLCJhIjoiY2trenZkMW9iMGZyajJxbnlvbGp2bHc0MyJ9.5Bs5nqP0zk29dsZIwEL6mg";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=${clave}`;

  try {
    const resultado = await axios.get(url);

    //console.log(resultado.data.features);
    return resultado.data;
  } catch (error) {
    console.log("Hy un error en el Api Localizacion", error);
  }
};

const apiClima = async (localizacion) => {
  const { features } = localizacion;
  const ciudad = features.find((localizacion) => {
    return localizacion.id;
  });
  const lat = ciudad.center[0];
  const log = ciudad.center[1];

  const clave = "b81a0b13ff2db110cacfe3b92a3ea3fc";
  const url = `http://api.openweathermap.org//data/2.5/weather?lat=${lat}&lon=${log}&appid=${clave}`;

  try {
    const resultado = await axios.get(url);
    //console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log("Hay un error en el Api Localizacion", error);
  }
};

export { localizacionApi, apiClima };
