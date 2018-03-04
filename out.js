
const figlet = require('figlet');
const chalk = require('chalk');

//Funciones de Color y Tipografía
const colorize = (msg, color) => {

	if (typeof color !== "undefined") {
		msg = chalk[color].bold(msg);
	}
	return msg;
};

const log =(msg, color) => {

	console.log(colorize(msg, color));
};

const biglog = (msg, color) => {

	log(figlet.textSync(msg, { horizontalLayout: 'full' }), color);
};

const errorlog = (emsg) => {

	console.log(`${colorize("Error", "red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}`);
};


exports = module.exports = {
	colorize,
	log,
	biglog,
	errorlog
};


