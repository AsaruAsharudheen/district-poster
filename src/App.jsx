import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const posterRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const downloadAsPNG = () => {
    if (!posterRef.current) return;
    html2canvas(posterRef.current, { useCORS: true, scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="poster-container">
      <div className="poster-wrapper" ref={posterRef}>
        <img src="/Tag.png" alt="Poster Background" className="poster-bg" />

        {/* Upload Area */}
        <div className="photo-frame">
          <label className="upload-area">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="uploaded-image"
                style={{
                  transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`,
                }}
              />
            ) : (
              <span className="upload-text">Click to upload photo</span>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
        </div>

        {/* Editable Text Fields */}
        <div style={{fontSize:'40px',fontWeight:'bold'}} className="text-field name-text" contentEditable suppressContentEditableWarning={true}>
          Type Name Here
        </div>
        <div style={{fontSize:'30px'}} className="text-field title-text" contentEditable suppressContentEditableWarning={true}>
          Type Title Here
        </div>
      </div>

      {/* Controls */}
      {uploadedImage && (
        <div className="controls">
          <div className="control-group">
            <label>Zoom:</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label>Left / Right:</label>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label>Up / Down:</label>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}

      <button className="download-button" onClick={downloadAsPNG}>
        Download as PNG
      </button>
    </div>
  );
};

export default App;
