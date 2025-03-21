import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import { updateApi, getApi } from "views/Api/comman";
import { urls } from "views/Api/constant";
import { toast } from 'react-toastify';


const currencyList = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "JPY", symbol: "¥" },
];

const CurrencyTabPanel = () => {
  const [currencyCode, setCurrencyCode] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [isEditing, setIsEditing] = useState(false);
 

  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getApi(urls.register.get);
      if (data) {
        const userData = data?.data?.data[0];
        setSettings(userData);
        setCurrencyCode(userData.currencyCode);
        setCurrencySymbol(userData.currencySymbol);
      }
    };
    fetchSettings();
  }, []);

  const handleCurrencyChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCurrency = currencyList.find((c) => c.code === selectedCode);
    setCurrencyCode(selectedCode);
    setCurrencySymbol(selectedCurrency ? selectedCurrency.symbol : "");
  };

  const handleCurrencySave = async () => {
    try {
      const response = await updateApi(
        urls.register.updateCurrency.replace(":id", userObj._id),
        { currencyCode, currencySymbol }
      );

      if (response.success) {
        const updatedUser = { ...userObj, currencyCode, currencySymbol };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
          toast.success('Currency Updated successfully');
       
      } else {
      toast.success('Currency is not update successfully');
      }
    } catch (error) {
      console.error("Error updating currency:", error);
  
    }
  };

  return (
    <Grid item xs={12} sm={12} display="flex" height="auto" justifyContent="center">
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "50%",
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Currency Code"
              variant="outlined"
              value={currencyCode}
              onChange={handleCurrencyChange}
              InputProps={{
                style: { cursor: "pointer", backgroundColor:"#f5f5f5" },
              }}
            >
              {currencyList.map((currency) => (
                <MenuItem key={currency.code} value={currency.code}>
                  {currency.code}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Currency Symbol"
              variant="outlined"
              value={currencySymbol}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
             
                <Button
                  variant="contained"
                  onClick={handleCurrencySave}
                  sx={{ backgroundColor: "#6A9C89", color: "#ffff", mt: "10px" }}
                >
                  Save Currency
                </Button>
          
            </Box>
          </Grid>
        </Grid>

       
      </Box>
    </Grid>
  );
};

export default CurrencyTabPanel;
