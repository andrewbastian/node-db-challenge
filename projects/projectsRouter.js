const express = require("express")
const db = require("../data/dbConfig")
const Projects = require('./projectsModel.js');
const router = express.Router()

//Projects//

router.get('/', (req, res) => {
  Projects.findProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.findProjectById(id)
  .then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});


router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.addProject(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

//TASKS//


router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;

  Projects.findTasks(id)
  .then(tasks => {
    if (tasks.length) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: 'Could not find tasks for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});


router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params; 

  console.log("task:", taskData);

  Projects.findProjectById(id)
  .then(project => {
    if (project) {
      Projects.addTask(taskData, id)
      .then(task => {
        res.status(201).json(task);
      })
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

//RESORCES//

router.get('/:id/resorces', (req, res) => {
    Projects.findResorce(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'Failed to get resorce'
            })
        })
})

router.post('/:id/resorces', (req, res) => {
  const resorceData = req.body;
  const { id } = req.params; 

  console.log("resorce:", resorceData);

  Projects.findProjectById(id)
  .then(project => {
    if (project) {
      Projects.addResorce(resorceData, id)
      .then(resorce => {
        res.status(201).json(resorce);
      })
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resorce' });
  });
});



module.exports = router