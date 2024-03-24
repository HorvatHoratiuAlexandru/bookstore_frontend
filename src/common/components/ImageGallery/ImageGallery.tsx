import { Box, Button, MobileStepper, useTheme } from "@mui/material";
import { BACKEND_BASE_URL } from "../../config";
import { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface ImageGalleryProps {
  urls: string[];
}

const ImageGallery = (props: ImageGalleryProps) => {
  const { urls } = props;
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);

  const handleClick = () => {
    setGalleryOpen((isOpen) => !isOpen);
  };

  const theme = useTheme();

  const maxSteps = urls.length || 0;
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((step) => step + 1);
  };
  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  return (
    <>
      {!galleryOpen && (
        <Box margin={1}>
          <Box
            height={"21vw"}
            marginX={1}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src={BACKEND_BASE_URL + "book/image/" + urls[activeStep]}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt={`Image ${activeStep}`}
            />
          </Box>
          <Box>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </Box>
      )}
      {galleryOpen && (
        <Box
          onClick={handleClick}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black overlay
            zIndex: 3, // ensures the modal appears above other content
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box height={"50vw"} margin={2} style={{ cursor: "pointer" }}>
            <img
              src={BACKEND_BASE_URL + "book/image/" + urls[activeStep]}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt={`Image ${activeStep}`}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ImageGallery;
