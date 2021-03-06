import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VerificationIssuaranceForm from "./VerificationIssuaranceForm";
import VerifyingCodeForm from "./VerifyingCodeForm";
import ChangePasswordPage from "./ChangePasswordPage";
import { useAppContext } from "../../app-context";
import { Navigate, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        User Management Project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <VerificationIssuaranceForm />;
    case 1:
      return <VerifyingCodeForm />;
    case 2:
      return <ChangePasswordPage />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

const PasswordResetPage = observer(() => {
  const { api, store } = useAppContext();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    await innerStep()
      .then(() => {
        setActiveStep(activeStep + 1);
      })
      .catch((error: Error) => {
        alert(error.message);
        return;
      });
  };

  const innerStep = async () => {
    switch (activeStep) {
      case 0:
        // 이메일 검증 => 인증코드 발급요청 API => 결과에 따라 이어서
        await api.user
          .issueTokenGet(store.user.passwordResetEmail)
          .catch((error: Error) => {
            throw error;
          });
        break;
      case 1:
        // 인증코드 검증 => 인증코드 검증 API => 결과에 따라 이어서
        await api.user
          .codeVerify(store.user.issueToken)
          .catch((error: Error) => {
            throw error;
          });
        break;
      case 2:
        // 새 비밀번호 & 비번확인 검증 => 비밀번호 변경 API 호출 => 결과에 따라 이어서
        await api.user.changePassword().catch((error: Error) => {
          throw error;
        });
        break;
      default:
        throw new Error("unknown step");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            User Management Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            비밀번호 재설정
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <Navigate replace to="/login" />
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
});

export default PasswordResetPage;
