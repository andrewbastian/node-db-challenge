const express = require('express');

const ProjectsRouter = require('./projects/projectsRouter.js');

const server = express();

server.use(logger)

server.use(express.json());

server.use('/api/projects', ProjectsRouter);

function logger(req, res, next) {
	console.log(`[${new Date().toISOString()}] - ${req.method} - ${req.url} - ${req.get("User-Agent")}`)
	next()
}
module.exports = server;