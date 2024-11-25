import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type PdfViewerExProps = {
    isCoordinator?: boolean;
};
const SLIDE_INDEX_STORAGE_KEY = 'currentSlideIndex';
const TOTAL_SLIDES = 5;

export default function PdfViewerEx({ isCoordinator = false }: PdfViewerExProps) {


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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                maxWidth: '95%',
                width: '100%',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Slide {currentSlide + 1} / {TOTAL_SLIDES}
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    height: isCoordinator ? 600 : 650,
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
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Tooltip title="Previous Slide">
                        <IconButton
                            onClick={handlePreviousSlide}
                            aria-label="Previous Slide"
                            disabled={currentSlide === 0}
                        >
                            <ArrowBackIcon sx={{ fontSize: '50px' }} />
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
                <Box></Box>
            )}
        </Box>
    );
}

