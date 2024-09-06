const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Route to check if Python is recognized
app.get('/check-python', (req, res) => {
  exec('python --version', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return res.status(500).send(`Error: ${err.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
    res.send(`Python is recognized. Version: ${stdout}`);
  });
});


app.post('/fetch-formats', (req, res) => {
  console.log('Received request to fetch formats:', req.body);
  // Rest of the code
});

app.post('/download-video', (req, res) => {
  console.log('Received request to download video:', req.body);
  // Rest of the code
});

// Route to fetch video formats using Python script
app.post('/fetch-formats', (req, res) => {
  const videoUrl = req.body.url;

  if (!videoUrl) {
    return res.status(400).send('No URL provided');
  }

  const command = `python get_formats.py ${videoUrl}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return res.status(500).send(`Error: ${err.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    console.log(`Formats: ${stdout}`);
    res.send(stdout); // Send the available formats back to the client
  });
});

// Route to download video using Python script
app.post('/download-video', (req, res) => {
  const { url, format } = req.body;

  if (!url || !format) {
    return res.status(400).send('URL or format not provided');
  }

  const command = `python download_video.py ${url} ${format}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return res.status(500).send(`Error: ${err.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    console.log(`Download Complete: ${stdout}`);
    res.send('Video downloaded successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
