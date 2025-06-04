import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from 'react-i18next';
 
const ConfirmDialog = ({ open, onClose, onConfirm }) => {
     const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}
    PaperProps={{
        sx: { width: 450, height: 300 }}}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
        <InfoIcon color="error" sx={{ fontSize: 50}} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="h4" sx={{ fontSize: "1.8rem", marginBottom: 1 }}>
         {t("delete_confirmation")}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
        {t("delete_warning")}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        <Button onClick={onConfirm} color="primary" variant="contained">
        {t("confirm_delete")}
        </Button>
        <Button onClick={onClose} color="error" variant="contained">
         {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default ConfirmDialog;
 
 