const db = require('../data/dbConfig')

//----------------------------//
function findProjects() {
    return db('projects')
}

//----------------------------//
function findProjectById(id) {
    return db('projects')
        .where({
            id
        })
        .first()
}

//----------------------------//
function findTasks(id) {
    return db('tasks as t')
    	.join('projects as p', 'p.id', 't.project_id')
        .where({ project_id: id })
        .select('t.id', 'p.project_name', 'p.project_description', 't.notes', 't.task_decription', 't.task_compleated')
}

//----------------------------//
function findResorce(project_id) {
    return db('project_resorces as pr')
        .join('resorces as r', 'pr.resorce_id', 'r.id' )
        .join('projects as p', 'pr.resorce_id', 'p.id')
        .select('p.project_name', 'r.resorces_name', 'r.resorces_description')
        .where('p.id', project_id)
}

//----------------------------//
function addProject(newProject) {
    return db('projects')
    .insert(newProject)
        .then(ids => {
            return findProjectById(ids[0]);
        });
}

//----------------------------//
async function addTask(task, project_id) {
	const newTask = {
		project_id: project_id,
		task_decription: task.task_decription,
		task_compleated: task.task_compleated,
		notes: task.notes
	}
	return db('tasks')
	.insert(newTask)
	return findTasks(id)
}

//----------------------------//
async function addResorce(resorce, project_id) {
	const newResorce = {
		project_id: project_id,
		resorces_description: resorce.resorces_description,
		resorces_name: resorce.resorces_name
	}
	return db('resorces')
	.insert(newResorce)
	return findResorce(id)
}

module.exports = {
	findProjects,
	findProjectById,
	addProject,
	findTasks,
	addTask,
	findResorce,
	addResorce
}



