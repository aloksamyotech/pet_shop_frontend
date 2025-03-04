import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, Button, Stack, Chip, Rating, Popover } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon
import HomeIcon from "@mui/icons-material/Home";
import ViewProduct from "./ViewProduct.js";
import AddLead from "./AddProduct.js";
import AddBulkUpload from "./productBulkUpload.js";
import AddEdit from "./Edit.js";
import { getApi, deleteApi } from "views/Api/comman.js";
import { urls } from "views/Api/constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Lead = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [productUpdated, setProductUpdated] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);

  const fetchProducts = async () => {
    const response = await getApi(urls.product.get);
    setProducts(response?.data?.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const handleClick = () => navigate("/dashboard/default");

  const handleView = (product) => {
    setSelectedProduct(product);
    setOpenView(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteApi(urls.product.delete.replace(":id", id));
          setProducts((prev) => prev.filter((product) => product._id !== id));
          Swal.fire("Removed!", "The Product has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete Product.", "error");
        }
      }
    });
  };

  const handleUpdate = (product) => {
    setProductUpdated(product);
    setOpenEdit(true);
  };

  const handlePopoverOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setActiveProduct(product);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setActiveProduct(null);
  };

  return (
    <>
      <AddEdit open={openEdit} handleClose={() => setOpenEdit(false)} fetchProduct={fetchProducts} product={productUpdated} />
      <ViewProduct open={openView} handleClose={() => setOpenView(false)} product={selectedProduct} />
      <AddBulkUpload open={open} handleClose={() => setOpen(false)} fetchProduct={fetchProducts} />
      <AddLead open={openAdd} handleClose={() => setOpenAdd(false)} fetchProduct={fetchProducts} />

      <Stack direction="row" alignItems="center" mb={3} backgroundColor="#fff" padding="10px">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HomeIcon sx={{ color: "#2067db", cursor: "pointer" }} onClick={handleClick} />
          <ArrowBackIosNewRoundedIcon sx={{ transform: "rotate(180deg)", fontSize: "18px", color: "black", mr: 1 }} />
          <Typography variant="h5">Product Management</Typography>
        </Box>
        <Stack direction="row" alignItems="center" ml="auto" spacing={2}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Bulk Upload
          </Button>
          <Button variant="contained" onClick={() => setOpenAdd(true)}>
            Add Product
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={1}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": { boxShadow: 5 },
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "0.3s",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl || "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"}
                alt={product.productName}
                sx={{ objectFit: "cover", borderRadius: 2 }}
              />

              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  {product.productName}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={product.rating || 4} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1, color: "#757575" }}>
                    {product.reviews || Math.floor(Math.random() * 500) + 1}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#757575", fontSize: "14px" }}>
                  <strong>Stock:</strong> {product.quantity || "0"}
                </Typography>

                <Typography variant="h6" sx={{ color: "#39b2e9", fontWeight: "bold" }}>
                  Rs.{product.price || "N/A"}
                </Typography>

                <Box sx={{ mt: 1 }}>
                  {product.category.map((cat, index) => (
                    <Chip key={index} label={cat.name} sx={{ backgroundColor: "#419737", color: "white", fontSize: "12px", mr: 1 }} />
                  ))}
                </Box>
              </CardContent>

              <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                <IconButton onClick={(e) => handlePopoverOpen(e, product)}>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Popover
                open={Boolean(anchorEl) && activeProduct?._id === product._id}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
                  <IconButton onClick={() => handleView(product)}>
                    <VisibilityIcon sx={{ color: "#00bbff" }} />
                  </IconButton>
                  <IconButton onClick={() => handleUpdate(product)}>
                    <EditIcon sx={{ color: "#5f0497" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)}>
                    <DeleteIcon sx={{ color: "#d32f2f" }} />
                  </IconButton>
                </Box>
              </Popover>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Lead;
