import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../features/Modal/modalSlice";
import { HelpInfo } from "../../features/Shared/HelpInfo";
import { Button, buttonType, buttonKind } from "./Button";

export const HelpButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      label="HELP"
      kind={buttonKind.default}
      type={buttonType.button}
      action={() => {
        dispatch(showModal({ content: <HelpInfo /> }));
      }}
    />
  );
};
