import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PreviewIcon from '@mui/icons-material/Preview';

export default function PdfUploader() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name); // Set the file name to simulate upload
    } else if (file) {
      alert("Please select a PDF file.");
    }
  };

  const handlePreview = () => {
    alert("This would preview the PDF.");
  };

  const handleUpload = () => {
    alert("This would upload the PDF.");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 300,
        margin: '0 auto',
        padding: 2,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Button
        variant="outlined"
        component="label"
        startIcon={<UploadFileIcon />}
      >
        Select PDF File
        <input
          type="file"
          accept=".pdf"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {fileName && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">Selected File: {fileName}</Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<PreviewIcon />} onClick={handlePreview}>
              Preview
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

