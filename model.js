//Modelo de datos.
// En esta variable se mantienen todos los quizzes existentes.
//Es un array de ibjetos, donde cada objeto tiene los atributos question y answer
// para guardar el texto de la pregunta y el de la respuesta.
const fs =require("fs");

const DB_FILENAME = "quizzes.json";




let quizzes = [
	{
		question: "Capital de Italia",
		answer: "Roma"
	},
	{
		question:"Capital de Francia",
		answer:"París"
	},
	{
		question:"Capital de España",
		answer:"Madrid"
	},
	{
		question:"Capital de Portugal",
		answer:"Lisboa"
	}
	];




const load = () => {

    fs.readFile(DB_FILENAME, (err, data) => {
        if(err) {

        	//la primera vez no existe el fichero
            if (err.code === "ENOENT") {
                save();  // valores iniciales
                return;
            }
            throw err;
        }

        let json = JSON.parse(data);

    	if (json) {
        	quizzes = json;
    	}
	});
};

const save = () => {

	fs.writeFile(DB_FILENAME,
		JSON.stringify(quizzes),
		err => {
			if(err) throw err;
	});
};












//Funciones para el manejo del array Q&A
exports.count = () => quizzes.length;



/*Añado un quizz al array*/
exports.add = (question, answer) => {
	quizzes.push({
		question: (question || "").trim(),
		answer: (answer || "").trim()
	});
	save();
};


/*Actualizacion*/
exports.update = (id, question, answer) => {
	const quiz = quizzes[id];
	if (typeof quiz === "undefined") {
		throw new Error(`El valor del parámetro id no es válido.`);
	}
	quizzes.splice(id, 1, { //en la posiscion id del array quizzes quiero quitar 
							//un elemento y pondré otro con los nuevos atributos 
							//pregunta respuesta
		question: (question || "").trim(),
		answer: (answer || "").trim()
	});
	save();
};

/*Devuelve todos los elementos del array, pasandolo por referencia, clonando una copia de quizzes, lo convierto en un string
y lo parseo para convertirlo de nuevo en un array*/
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));


/*devuelvo el elemento de la posicion id del array*/
exports.getByIndex = id => {

	const quiz = quizzes[id];
	if (typeof quiz === "undefined") {
		throw new Error(`El valor del parámetro id no es válido.`);
	}
	return JSON.parse(JSON.stringify(quiz));
};

exports.deleteByIndex = id => {
	const quiz = quizzes[id];
	if (typeof quiz === "undefined") {
		throw new Error(`El valor del parámetro id no es válido.`);
	}
	quizzes.splice(id, 1);
	save();
};

load();