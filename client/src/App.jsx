import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [error, setError] = useState('');

  const handleFetchFormats = async () => {
    try {
      const response = await axios.post('/fetch-formats', { url: videoUrl });
      setFormats(response.data.split('\n').filter(Boolean));
      setError('');
    } catch (error) {
      setError('Failed to fetch formats. Please check the URL.');
      console.error('Failed to fetch formats:', error);
    }
  };

  const handleDownloadVideo = async () => {
    try {
      const response = await axios.post('/download-video', {
        url: videoUrl,
        format: selectedFormat,
      });
      alert(response.data);
      setError('');
    } catch (error) {
      setError('Failed to download video.');
      console.error('Failed to download video:', error);
    }
  };

  return (
    <div className="container">
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={handleFetchFormats}>Fetch Formats</button>

      {formats.length > 0 && (
        <div>
          <select onChange={(e) => setSelectedFormat(e.target.value)} defaultValue="">
            <option value="" disabled>Select a format</option>
            {formats.map((format, index) => (
              <option key={index} value={format.split(',')[0].split(': ')[1]}>
                {format}
              </option>
            ))}
          </select>
          <button onClick={handleDownloadVideo}>Download Video</button>
        </div>
      )}
      
      {error && <div className="alert">{error}</div>}
    </div>
  );
}

export default App;
