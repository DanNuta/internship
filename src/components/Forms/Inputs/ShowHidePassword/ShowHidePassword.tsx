import React from "react";

interface HideProps {
  onShowHideFn: () => void;
  state: boolean;
}

export const ShowHidePassword: React.FC<HideProps> = ({
  onShowHideFn,
  state,
}) => {
  return (
    <div className="show_passsword" onClick={onShowHideFn}>
      {state ? "Hide" : "Show"}
    </div>
  );
};
