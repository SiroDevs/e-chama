import * as React from "react";
import { Button, Dialog, TextField, DialogTitle } from "@mui/material";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import useEventCallback from "@mui/utils/useEventCallback";
import DialogsContext from "./DialogsContext";

export interface OpenDialogOptions<R> {
  onClose?: (result: R) => Promise<void>;
}

export interface AlertOptions extends OpenDialogOptions<void> {
  title?: React.ReactNode;
  okText?: React.ReactNode;
}

export interface ConfirmOptions extends OpenDialogOptions<boolean> {
  title?: React.ReactNode;
  okText?: React.ReactNode;
  severity?: "error" | "info" | "success" | "warning";
  cancelText?: React.ReactNode;
}

export interface PromptOptions extends OpenDialogOptions<string | null> {
  title?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
}

export interface DialogProps<P = undefined, R = void> {
  payload: P;
  open: boolean;
  onClose: (result: R) => Promise<void>;
}

export interface OpenAlertDialog {
  (msg: React.ReactNode, options?: AlertOptions): Promise<void>;
}

export interface OpenConfirmDialog {
  (msg: React.ReactNode, options?: ConfirmOptions): Promise<boolean>;
}

export interface OpenPromptDialog {
  (msg: React.ReactNode, options?: PromptOptions): Promise<string | null>;
}

export type DialogComponent<P, R> = React.ComponentType<DialogProps<P, R>>;

export interface OpenDialog {
  <P extends undefined, R>(
    Component: DialogComponent<P, R>,
    payload?: P,
    options?: OpenDialogOptions<R>
  ): Promise<R>;
  <P, R>(
    Component: DialogComponent<P, R>,
    payload: P,
    options?: OpenDialogOptions<R>
  ): Promise<R>;
}

export interface CloseDialog {
  <R>(dialog: Promise<R>, result: R): Promise<R>;
}

export interface DialogHook {
  alert: OpenAlertDialog;
  confirm: OpenConfirmDialog;
  prompt: OpenPromptDialog;
  open: OpenDialog;
  close: CloseDialog;
}

function useDialogLoadingButton(onClose: () => Promise<void>) {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClose();
    } finally {
      setLoading(false);
    }
  };
  return {
    onClick: handleClick,
    loading,
  };
}

export interface AlertDialogPayload extends AlertOptions {
  msg: React.ReactNode;
}

export interface AlertDialogProps
  extends DialogProps<AlertDialogPayload, void> {}

export function AlertDialog({ open, payload, onClose }: AlertDialogProps) {
  const okButtonProps = useDialogLoadingButton(() => onClose());

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle>{payload.title ?? "Alert"}</DialogTitle>
      <DialogContent>{payload.msg}</DialogContent>
      <DialogActions>
        <Button disabled={!open} {...okButtonProps}>
          {payload.okText ?? "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface ConfirmDialogPayload extends ConfirmOptions {
  msg: React.ReactNode;
}

export interface ConfirmDialogProps
  extends DialogProps<ConfirmDialogPayload, boolean> {}

export function ConfirmDialog({ open, payload, onClose }: ConfirmDialogProps) {
  const cancelButtonProps = useDialogLoadingButton(() => onClose(false));
  const okButtonProps = useDialogLoadingButton(() => onClose(true));

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={() => onClose(false)}>
      <DialogTitle>{payload.title ?? "Confirm"}</DialogTitle>
      <DialogContent>{payload.msg}</DialogContent>
      <DialogActions>
        <Button autoFocus disabled={!open} {...cancelButtonProps}>
          {payload.cancelText ?? "Cancel"}
        </Button>
        <Button color={payload.severity} disabled={!open} {...okButtonProps}>
          {payload.okText ?? "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface PromptDialogPayload extends PromptOptions {
  msg: React.ReactNode;
}

export interface PromptDialogProps
  extends DialogProps<PromptDialogPayload, string | null> {}

export function PromptDialog({ open, payload, onClose }: PromptDialogProps) {
  const [input, setInput] = React.useState("");
  const cancelButtonProps = useDialogLoadingButton(() => onClose(null));

  const [loading, setLoading] = React.useState(false);

  const name = "input";
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={() => onClose(null)}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
              setLoading(true);
              const formData = new FormData(event.currentTarget);
              const value = formData.get(name) ?? "";

              if (typeof value !== "string") {
                throw new Error("Value must come from a text input.");
              }

              await onClose(value);
            } finally {
              setLoading(false);
            }
          },
        },
      }}
    >
      <DialogTitle>{payload.title ?? "Confirm"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{payload.msg} </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name={name}
          type="text"
          fullWidth
          variant="standard"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!open} {...cancelButtonProps}>
          {payload.cancelText ?? "Cancel"}
        </Button>
        <Button disabled={!open} loading={loading} type="submit">
          {payload.okText ?? "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function useDialogs(): DialogHook {
  const dialogsContext = React.useContext(DialogsContext);
  if (!dialogsContext) {
    throw new Error("Dialogs context was used without a provider.");
  }
  const { open, close } = dialogsContext;

  const alert = useEventCallback<OpenAlertDialog>(
    (msg, { onClose, ...options } = {}) =>
      open(AlertDialog, { ...options, msg }, { onClose })
  );

  const confirm = useEventCallback<OpenConfirmDialog>(
    (msg, { onClose, ...options } = {}) =>
      open(ConfirmDialog, { ...options, msg }, { onClose })
  );

  const prompt = useEventCallback<OpenPromptDialog>(
    (msg, { onClose, ...options } = {}) =>
      open(PromptDialog, { ...options, msg }, { onClose })
  );

  return React.useMemo(
    () => ({
      alert,
      confirm,
      prompt,
      open,
      close,
    }),
    [alert, close, confirm, open, prompt]
  );
}
