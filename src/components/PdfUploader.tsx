import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PreviewIcon from '@mui/icons-material/Preview';
import Tooltip from '@mui/material/Tooltip';

export default function PdfUploader() {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setFileName(file.name);
        } else if (file) {
            alert("Bitte PDF Datei auswählen.");
        }
    };

    const handlePreview = () => {
        alert("Die PDF Vorschau ist in diesem Prototyp nicht implementiert.");
    };

    const handleUpload = () => {
        alert("Der PDF Upload ist in diesem Prototyp nicht implementiert.");
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
            <Tooltip title="Der PDF Upload ist nicht vollständig implementiert. Eine Datei kann ausgewählt werden, aber nicht angezeigt oder hochgeladen werden.">
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                >
                    PDF Datei auswählen
                    <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
            </Tooltip>

            {fileName && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">Selected File: {fileName}</Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="outlined" startIcon={<PreviewIcon />} onClick={handlePreview}>
                            Vorschau
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

