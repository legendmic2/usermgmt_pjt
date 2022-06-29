import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../../app-context";
import Timer from "./Timer";

const VerifyingCodeForm = observer(() => {
  const { api, store } = useAppContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        인증 코드 검증
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="cardName"
            label="이메일로 전송받은 인증 코드를 입력하세요."
            defaultValue={store.user.verifyingCode}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              store.user.setVerifyingCode(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Timer
            remainMillisecond={store.user.remainMillisecond}
            leftMin={store.user.leftMin}
            leftSec={store.user.leftSec}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default VerifyingCodeForm;
