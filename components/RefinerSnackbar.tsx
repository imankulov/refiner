import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

import { atom, useAtom } from "jotai";

const snackbarOpenAtom = atom(false);
const snackbarContentAtom = atom("");
const snackbarSeverityAtom = atom<AlertProps["severity"]>("success");

export function RefinerSnackbar() {
  const [open, setOpen] = useAtom(snackbarOpenAtom);
  const [snackbarContent] = useAtom(snackbarContentAtom);
  const [severity] = useAtom(snackbarSeverityAtom);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {snackbarContent}
      </Alert>
    </Snackbar>
  );
}

export const useShowSnackbar = () => {
  const [, setSnackbarOpen] = useAtom(snackbarOpenAtom);
  const [, setSnackbarContent] = useAtom(snackbarContentAtom);
  const [, setSnackbarSeverity] = useAtom(snackbarSeverityAtom);

  const showSnackbar = (
    content: string,
    severity: AlertProps["severity"] = "success"
  ) => {
    setSnackbarContent(content);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return showSnackbar;
};
