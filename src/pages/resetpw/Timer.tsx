import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app-context";

export interface Props {
  remainMillisecond: number;
  leftMin: number;
  leftSec: number;
}

const Timer = observer((props: Props) => {
  const { remainMillisecond, leftMin, leftSec } = props;
  const { api, store } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (store.user.remainMillisecond >= 1000) {
        store.user.remainMillisecondDecrease();
      } else {
        alert("인증 코드가 만료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <div>
      {leftMin < 10 ? `0${leftMin}` : leftMin}:
      {leftSec < 10 ? `0${leftSec}` : leftSec}
    </div>
  );
});

export default Timer;
