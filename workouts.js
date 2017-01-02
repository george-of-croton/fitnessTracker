#!/usr/bin/env node

var knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: __dirname + '/dev.sqlite3'
	},
	useNullAsDefault: true
})

console.log("hello")

var cmd = process.argv[2]
var note = process.argv[3]
var identifier = process.argv[4]

switch (cmd) {
	case 'add':
		noteSplitter(note)
		addNewWorkout(note)
			.then(getAll)
			.then(listWorkouts)
			.catch(logError)
			.finally(closeDB)
		break

	case 'list':
		getAll()
			.then(listWorkouts)
			.catch(logError)
			.finally(closeDB)
		break

	case 'get':
		getWorkoutById(note)
			.then(listWorkouts)
			.catch(logError)
			.finally(closeDB)
		break

	default:
		console.log('no matched cases')
		closeDB()
		break
}


function listWorkouts(workouts) {
	workouts.forEach(function(workouts) {
		console.log(workouts)
	})
}

function getWorkoutById(act) {
	return knex.select().from('workouts').where('activity', act);
}

function logError(err) {
	console.log('Dang, we exploded like a bomb: ', err)
}

function getAll() {
	return knex.raw('select * from "workouts"')
}

function addNewWorkout(details) {
	var details = noteSplitter(details)
	return knex('workouts')
		.insert({
			'activity': details[0],
			'duration': details[1],
			'distance': details[2],
			'location': details[3],
			"route": details[4]
		})
}

function noteSplitter(note) {
	return note.split(" ")
}

function closeDB() {
	knex.destroy()
}
