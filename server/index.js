const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const { exec } = require('child_process'); // To execute pm2 commands for restarting

const app = express();
const port = 8080;

let pythonProcesses = []; // Store references to running python processes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Function to handle spawning of Python scripts and store the process reference
const runPythonScript = (scriptName, res) => {
  const pythonProcess = spawn('python', [scriptName]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data.toString()}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.status(200).send(`${scriptName} executed successfully`);
    } else {
      res.status(500).send(`Error executing ${scriptName} with exit code ${code}`);
    }
  });

  // Store the process reference to terminate it later
  pythonProcesses.push(pythonProcess);
};

// Route for restarting the server
app.post('/restart', (req, res) => {
  console.log("Restarting server...");

  // Stop all running Python processes before restarting the server
  pythonProcesses.forEach((process) => {
    process.kill('SIGINT'); // Gracefully kill the process
    console.log("Killed Python process");
  });

  // Clear the python processes array
  pythonProcesses = [];

  // Trigger a restart via pm2
  exec('pm2 restart app', (err, stdout, stderr) => {
    if (err) {
      console.error('Error restarting server:', err);
      res.status(500).send('Failed to restart the server');
    } else {
      console.log('Server restarted successfully');
      res.status(200).send('Server is restarting');
    }
  });
});

// Define routes for Yoga poses
const yogaRoutes = [
  { path: '/api/mediapipe/yog1', script: 'main1.py' },
  { path: '/api/mediapipe/yog2', script: 'main2.py' },
  { path: '/api/mediapipe/yog3', script: 'main3.py' },
  { path: '/api/mediapipe/yog4', script: 'main4.py' },
  { path: '/api/mediapipe/yog5', script: 'main5.py' },
  { path: '/api/mediapipe/yog6', script: 'main6.py' }
];

// Dynamically create routes for each Yoga pose
yogaRoutes.forEach(route => {
  app.post(route.path, (req, res) => {
    console.log(`Received request for: ${route.path}`);
    runPythonScript(route.script, res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
