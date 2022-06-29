import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../../app-context";
import { TextField } from "@mui/material";
import { runInAction } from "mobx";

const ChangePasswordPage = observer(() => {
  const { api, store } = useAppContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        비밀번호 변경
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="newPassword"
            label="새로운 비밀번호를 입력하세요."
            defaultValue={store.user.newPassword}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              runInAction(() => {
                store.user.newPassword = e.target.value;
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="confirmPassword"
            label="새로운 비밀번호를 한번 더 입력하세요."
            defaultValue={store.user.confirmPassword}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              runInAction(() => {
                store.user.confirmPassword = e.target.value;
              })
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default ChangePasswordPage;
