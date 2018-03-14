const Sequelize = require('sequelize'); //cargar el módulo sequelize

const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false}); //URL para acceder a la BBDD

sequelize.define('quiz', {	//DEFINO QUIZ COMO MODELO DE DATOS
	question: {
		type: Sequelize.STRING,
		unique: {msg: "Ya existe esta pregunta"},  	//no se pueden repetir las preguntas
		validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}//no se pueden crear preguntas vacías
	},
	answer: {
		type: Sequelize.STRING,
		validate: {notEmpty: {msg: "La respuesta no puede estar vacía"}} //no puede ser una respuesta vacía
	}
});

sequelize.sync()
.then(() => sequelize.models.quiz.count())  //contamos cuantos quizzes hay dentro del modelo quiz de sequelize
.then(count => {
	if(!count) {  //si es cero
		return sequelize.models.quiz.bulkCreate([  //creamos varios quizzes con la función bulkCreate
			{question: "Capital de Italia", answer: "Roma"},
            {question: "Capital de Francia", answer: "París"},
            {question: "Capital de España", answer: "Madrid"},
            {question: "Capital de Portugal", answer: "Lisboa"}

            ]);
	}
})
.catch(error => {
	console.log(error); //mensaje de error por la consola
});

module.exports = sequelize;  //exporto sequelize