import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

type PdfViewerProps = {
    isCoordinator?: boolean;
};

const SLIDE_INDEX_STORAGE_KEY = 'currentSlideIndex';
const TOTAL_SLIDES = 5;

export default function PdfViewer({ isCoordinator = false }: PdfViewerProps) {
    const navigate = useNavigate();
    const handleSlideClick = () => {
        navigate('/participant/slides');
    };
    const handleCSlideClick = () => {
        navigate('/coordinator/slides');
    };
    const [currentSlide, setCurrentSlide] = useState(() => {
        const storedSlideIndex = sessionStorage.getItem(SLIDE_INDEX_STORAGE_KEY);
        return storedSlideIndex ? parseInt(storedSlideIndex, 10) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem(SLIDE_INDEX_STORAGE_KEY, currentSlide.toString());
    }, [currentSlide]);

    const handleNextSlide = () => {
        if (currentSlide < TOTAL_SLIDES - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const handlePreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            border: '1px solid grey',
            borderRadius: 2,
        }}>
            <ThemeProvider theme={theme}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Slide {currentSlide + 1} / {TOTAL_SLIDES}
                </Typography>
            </ThemeProvider>
            
            <Box sx={{
                    width: '100%',
                    height: isCoordinator ? '63vh' : '63vh',
                    backgroundColor: 'lightgray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    marginBottom: 2,
                }}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="text.secondary">
                            Slide {currentSlide + 1}
                        </Typography>
                    </ThemeProvider>
                
            </Box>
            {isCoordinator ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Tooltip title="Previous Slide">
                        <IconButton
                            onClick={handlePreviousSlide}
                            aria-label="Previous Slide"
                            disabled={currentSlide === 0}
                        >
                            <ArrowBackIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="To Slide View">
                        <IconButton onClick={isCoordinator ? handleCSlideClick : handleSlideClick} aria-label="Expand">
                            <FullscreenIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Next Slide">
                        <IconButton
                            onClick={handleNextSlide}
                            aria-label="Next Slide"
                            disabled={currentSlide === TOTAL_SLIDES - 1}
                        >
                            <ArrowForwardIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : (
                <Box sx={{ position: 'relative' }}>
                    <Tooltip title="To Slide View">
                        <IconButton onClick={isCoordinator ? handleCSlideClick : handleSlideClick} aria-label="Expand" sx={{
                            position: 'absolute',
                            bottom: 5,
                            left: 350,
                        }}
                        >
                            <FullscreenIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </Box>
        /** 
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                maxWidth: isCoordinator ? '100% ' : '90%',
                width: '100%',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Slide {currentSlide + 1} / {TOTAL_SLIDES}
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    height: isCoordinator ? 500 : 250,
                    backgroundColor: 'lightgray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h4" color="text.secondary">
                    Slide {currentSlide + 1}
                </Typography>
            </Box>
            {isCoordinator ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Tooltip title="Previous Slide">
                        <IconButton
                            onClick={handlePreviousSlide}
                            aria-label="Previous Slide"
                            disabled={currentSlide === 0}
                        >
                            <ArrowBackIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="To Slide View">
                        <IconButton onClick={isCoordinator ? handleCSlideClick : handleSlideClick} aria-label="Expand">
                            <FullscreenIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Next Slide">
                        <IconButton
                            onClick={handleNextSlide}
                            aria-label="Next Slide"
                            disabled={currentSlide === TOTAL_SLIDES - 1}
                        >
                            <ArrowForwardIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : (
                <Box sx={{ position: 'relative' }}>
                    <Tooltip title="To Slide View">
                        <IconButton onClick={isCoordinator ? handleCSlideClick : handleSlideClick} aria-label="Expand" sx={{
                            position: 'absolute',
                            bottom: 5,
                            left: 180,
                        }}
                        >
                            <FullscreenIcon sx={{ fontSize: '50px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </Box>
        */
    );
}

