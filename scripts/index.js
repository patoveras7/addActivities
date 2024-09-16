//Creamos la clase Actividades a partir de la cual luego crearemos los objetos (instancia de clase) de cada actividad.
class Activity { 
    constructor(id, title, description, imgUrl) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.imgUrl = imgUrl
    }
}
//Creamos la clase Repositorio a partir de la cual se creará una sola instancia de la clase (objeto) y a traves de dicho objeto se agregaran elementos al array incluido dentro de su unica propiedad.
class Repository { 
    constructor() {
        this.activities = []
    }
    //Es necesario crear el objeto para poder operar con los metodos. Recordemos que los metodos son funciones para operar con las objetos creados
    //a partir de las clases.
    //Una vez que ya tenemos un objeto de la clase Actividades, podemos agregarlas a traves del objeto de la clase Repositorio al array que va a funcionar de base de datos local.
    createActivity(title, description, imgUrl) { 
        const id = this.activities.length + 1;
        const actividad = new Activity (id, title, description, imgUrl);
        this.activities.push(actividad)
    }
    getAllActivities() {
        return this.activities;
    }
    deleteActivity(identifier) {
    this.activities.filter((num) => num.id == identifier)
    return this.activities
    }
}

const repository = new Repository()

const buildActivity = (activity) => { 
    //Se utiliza el destructuring para desarmar el objeto.
    const {id, title, description, imgUrl} = activity
    // Creamos la etiqueta/elementos de la carta.
    const containerCard = document.createElement("div"); 
    const titleElement = document.createElement("h1");
    const descriptionElement = document.createElement("p");
    const imgElement = document.createElement("img");
    const identifier = id;
    //agregamos el contenido a las etiquetas/elementos (puede ser innerHTML tambien).
    titleElement.textContent = title;
    descriptionElement.textContent = description;
    imgElement.src = imgUrl;
    //agregamos los elementos al contenedor padre.
    containerCard.appendChild(titleElement);
    containerCard.appendChild(imgElement);
    containerCard.appendChild(descriptionElement);
    //agregamos estilos al contenedor padre.
    containerCard.classList.add("cardActivity");
    titleElement.classList.add("titleActivity");
    descriptionElement.classList.add("descriptionActivity");
    imgElement.classList.add("imgActivity");
    //Implementamos una funcionalidad para remover mediante un click.
    containerCard.addEventListener('click', ()=>{
        containerCard.remove();
    });
    return containerCard;

}

const convertActivities = () =>{
const containerActivities = document.getElementById("generalContainer");
containerActivities.innerHTML = " ";
const allActivities = repository.getAllActivities();
// En teoria al map le damos un array y devuelve otro con los elementos que cumplan las condiciones. Tambien podemos pedir que los devuelva luego de pasar por una función.
const actividadesTodas = allActivities.map((activity) => buildActivity(activity));  
//Aunque en realidad se sugiere utilizar un for each ya que solo hay que recorrer. No es recomendable usar un .map
//porque en ese caso estariamos creando una variable y guardando cosas en memoria porque si.
actividadesTodas.forEach((activity) => {
containerActivities.appendChild(activity);})
}

const handler = () => {
    //Cada vez que tenemos un boton de formulario hay que agregar el prevent default sino se nos va a recargar la pagina.
    //e.preventDefault();// Porque estamos dentro de un formulario, caso contrario no haria falta. Estamos ejecutando un evento cuya estructura contiene es su prototipo el prevent default.
    //No hace falta que las guardemos de antemano, podemos guardarlas en una variable al mismo momento que ejecutamos value. 
    const title = document.getElementById("title").value; 
    const description = document.getElementById("description").value;
    const imgUrl = document.getElementById("imgUrl").value;
    //En teoria el operador logico de negacion establece: "Si tal variable es 0 o en este caso ' '"
    if (!title || !description || !imgUrl) { 
        alert("Please, complete all the places.")        
    } else {    
    repository.createActivity(title, description, imgUrl); 
    //Tambien se puede llamar al formulario y ponerle reset.
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("imgUrl").value = "";
    return convertActivities();    
    }
}

const button = document.getElementById("button");
button.addEventListener("click", handler); // Orden de primer grado -investigar-.





















