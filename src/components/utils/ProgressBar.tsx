import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';

interface ProgressBarProps {
    steps: number // number of steps
    maxWidth: string // maxWidth of ProgressBar,
    width: string
    minWidth: string
    getCurrentStep: any
}

export default function ProgressBar({ steps, maxWidth, width, minWidth, getCurrentStep }: ProgressBarProps,) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            const nextStep = prevActiveStep + 1;
            getCurrentStep(nextStep); // Pass the updated nextStep value to getCurrentStep function
            return nextStep;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            const previousStep = prevActiveStep - 1;
            getCurrentStep(previousStep); // Pass the updated previousStep value to getCurrentStep function
            return previousStep;
        });

    };

    return (
        <MobileStepper
            variant="progress"
            steps={steps + 1}
            position="static"
            activeStep={activeStep}

            sx={{
                width: { width }, minWidth: { minWidth }, flexGrow: 1, maxWidth: maxWidth,
                backgroundColor: 'transparent',
                '& .MuiLinearProgress-root': {
                    backgroundColor: '#696969',
                    minWidth: { minWidth },



                },
                '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1a1a1a',
                    minWidth: { minWidth },


                },
            }}
            nextButton={
                <IconButton
                    sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '1px solid #1a1a1a',
                        backgroundColor: 'transparent',
                        color: '#1a1a1a',
                        '&:hover': { backgroundColor: '#1a1a1a', color: 'black', outlineColor: 'black', border: '1px solid black' },
                        '&:disabled': { border: '1px solid #1a1a1a', color: '#1a1a1a' }
                    }}

                    onClick={handleNext} disabled={activeStep === steps}>
                    {theme.direction === 'rtl' ? (<KeyboardArrowLeft sx={{ backgroundColor: '#1a1a1a' }} />)
                        : (<KeyboardArrowRight />)}
                </IconButton>
            }
            backButton={
                <IconButton
                    sx={{
                        // width: '40px',
                        // height: '40px',
                        // borderRadius: '50%',
                        // border: (theme) => (activeStep === 0 ? '1px solid #1a1a1a' : '1px solid #1a1a1a'),
                        // backgroundColor: () => (activeStep === steps ? 'transparent' : 'transparent'),
                        // color: () => (activeStep === 0 ? '#1a1a1a' : '#1a1a1a'),
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '1px solid #1a1a1a',
                        backgroundColor: 'transparent',
                        color: '#1a1a1a',
                        '&:hover': { backgroundColor: '#1a1a1a', color: 'black', outlineColor: 'black', border: '1px solid black' },
                        '&:disabled': { border: '1px solid #1a1a1a', color: '#1a1a1a', backgroundColor: 'transparent' }
                    }}
                    onClick={handleBack} disabled={activeStep === 0}>
                    {
                        theme.direction === 'rtl' ? (<KeyboardArrowRight />)
                            : (<KeyboardArrowLeft />)
                    }
                </IconButton >
            }
        />
    );
}