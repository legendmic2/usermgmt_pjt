import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../../app-context";
import { runInAction } from "mobx";

export interface Props {
  // passwordResetEmail: string;
}

const VerificationIssuaranceForm = observer((props: Props) => {
  const { api, store } = useAppContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        인증 코드 발급 요청
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            defaultValue={store.user.passwordResetEmail}
            label="인증 코드를 발급받을 이메일을 입력하세요."
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              store.user.setPasswordResetEmail(e.target.value)
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default VerificationIssuaranceForm;
