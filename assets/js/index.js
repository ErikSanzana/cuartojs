const propiedadesJSON = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src: "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
    rooms: 2,
    m: 170,
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el océano",
    src: "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
    rooms: 2,
    m: 130,
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src: "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
    rooms: 1,
    m: 80,
  },
  {
    name: "Casa rodante",
    description: "Conviértete en un nómada del mundo sin salir de tu casa",
    src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    rooms: 1,
    m: 6,
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    rooms: 3,
    m: 200,
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños",
    src: "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
    rooms: 5,
    m: 500,
  },
];

let h4Element = document.querySelector("#Propiedades h4");
h4Element.querySelector("span").textContent = "0";
/* inicializamos el total */

document.addEventListener('DOMContentLoaded', function() {
  var total = 0;
  let cantidad = document.getElementById('cantidad');
  let desde = document.getElementById('desde');
  let hasta = document.getElementById('hasta');
  /* buscamos el valor de los ids de nuestro html */

  let buscarBtn = document.getElementById('buscar');
  /*  definimos el boton buscar */
  buscarBtn.addEventListener('click', function(event) {
    /* agregamos el evento click con una funcion */
    event.preventDefault();
    /* evitamos que se cargue por default */

    let cantidadValue = parseInt(cantidad.value);
    /* escogemos el valor */
    let desdeValue = parseInt(desde.value);
    /* escogemos el valor */
    let hastaValue = parseInt(hasta.value);
    /* escogemos el valor */

    if (isNaN(cantidadValue) || isNaN(desdeValue) || isNaN(hastaValue)) {
      /* verifica si estan en blancos para no tener problemas de sintaxis y cosas raras */
      alert("Faltan datos importantes para continuar con la solicitud");
      /* mando una alerta por que los usuarios no entenderan a menos que se les avise */
    } else {
      total = 0;
      /* lo reiniciamos a 0 */
     
      let padre = document.getElementById("propiedades");
      while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
      }
      /* reseteamos para partir de 0 y asi no agregas un div sobre otro */

      for (let i = 0; i < propiedadesJSON.length; i++) {
        /* a recorrer el json de arriba  */
        if (propiedadesJSON[i].rooms >= cantidadValue) {
          /* aca indicamos que si la casa de esa vuelta la cantidad de cuartos cumple o no */
          if (propiedadesJSON[i].m >= desdeValue && propiedadesJSON[i].m <= hastaValue) {
            /* ahora debe cumplir con el minimo y con el maximo */
            let elemento = propiedadesJSON[i];
            total++;
            /* le sumas 1 al total */

            let template = document.createElement("template");
            /* creando template */
            template.innerHTML = `
              <div class="propiedad">
                <div class="img" style="background-image: url('${elemento.src}')"></div>
                <section>
                  <h5>${elemento.name}</h5>
                  <div class="d-flex justify-content-between">
                    <p>Cuartos: ${elemento.rooms}</p>
                    <p>Metros: ${elemento.m}</p>
                  </div>
                  <p class="my-3">${elemento.description}</p>
                  <button class="btn btn-info">Ver más</button>
                </section>
              </div>
            `;
/* base del template */
            let clone = document.importNode(template.content, true);
            /* aca es un nodo donde clonamos el template y lo vamos a mandar al padre */
            padre.appendChild(clone);
          }
        }
      }

      h4Element.querySelector("span").textContent = total.toString();
      /* agregamos el total de resultados */
      cantidad.value = ""; 
      desde.value = ""; 
      hasta.value = "";
      /* reseteamos estas 3 cosas para que no joda mas  */
    }
  });
  var padre = document.getElementById("propiedades");
  for (var i = 0; i < propiedadesJSON.length; i++) {
    var elemento = propiedadesJSON[i];

    var template = document.createElement("template");
    template.innerHTML = `
      <div class="propiedad">
        <div class="img" style="background-image: url('${elemento.src}')"></div>
        <section>
          <h5>${elemento.name}</h5>
          <div class="d-flex justify-content-between">
            <p>Cuartos: ${elemento.rooms}</p>
            <p>Metros: ${elemento.m}</p>
          </div>
          <p class="my-3">${elemento.description}</p>
          <button class="btn btn-info">Ver más</button>
        </section>
      </div>
    `;

    var clone = document.importNode(template.content, true);
    padre.appendChild(clone);
  }
  /* mostrar todo de manera predeterminada como dijo el compañero menos mal por que soy pesimo leyendo instrucciones */
});
