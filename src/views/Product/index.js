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
import Iconify from 'ui-component/iconify';
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddIcon from "@mui/icons-material/Add"; // Import Plus icon

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

     

      <Box
            sx={{
              backgroundColor: 'white',
              height: '50px',
              width: '100%',
              display: 'flex',
              borderRadius: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 25px',
             mb:'40px'
            }}
          >
              <Stack direction="row" alignItems="center" >
                <IconButton onClick={() => navigate('/dashboard/default')} sx={{ color: '#2067db' }}>
                  <HomeIcon />
                </IconButton>
                <ArrowBackIosNewRoundedIcon sx={{ transform: 'rotate(180deg)', fontSize: '18px', color: 'black' , mr:1 }} />
                <Typography variant='h5'>Product Information</Typography> </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Card>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}  onClick={() => setOpen(true)} size="small">
                Bulk Upload
                </Button>
            </Card>
            <Card>  <Button variant="contained" onClick={() => setOpenAdd(true)} startIcon={<Iconify icon="eva:plus-fill" />}  size="small">
            Add Product
          </Button></Card>
            </Stack>
          </Box>

      <Grid container spacing={1} sx={{marginTop: '-30px'}}>
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

<CardContent sx={{mt:"-15px"}}>
  <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
    {product.productName}
  </Typography>

  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Rating value={product.rating || 4} precision={0.5} readOnly size="small" />
    <Typography variant="body2" sx={{ ml: 1, color: "#757575" }}>
      {product.reviews || Math.floor(Math.random() * 500) + 1}
    </Typography>
  </Box>

  <Box>
    {product.category.map((cat, index) => (
      <Box key={index}>
        <Typography sx={{ color: "#757575", fontSize: "14px" }}>
          <strong>Category:</strong> {cat.name}
        </Typography>
      </Box>
    ))}
  </Box>

  <Typography variant="body2" sx={{ color: "#757575", fontSize: "14px" }}>
    <strong>Stock:</strong> {product.quantity || "0"}
  </Typography>


  <Typography variant="h6" sx={{ color: "#39b2e9", fontWeight: "bold"}}>
    Rs.{product.price || "N/A"}
  </Typography>

 
  <Box sx={{ display: "flex", flexDirection: "row" ,justifyContent:'space-between' , gap:'2px',mt:'2px'}}>


  <Box
  sx={{
    backgroundColor: "#D5FADF",
    color: "#19AB53",
    padding: "1px",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "20px",
    textTransform: "uppercase",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    gap: "0.5rem",
    fontSize: "10px",
    cursor: "pointer", 
    transition: "background-color 0.3s ease, transform 0.2s ease", 
    "&:hover": {
      backgroundColor: "#B2F0C6", 
      transform: "scale(1.05)", 
    },
    "&:active": {
      transform: "scale(0.95)", 
    }
  }}
  onClick={() => handleView(product)}
>
  View
</Box>

<Box
  sx={{
    backgroundColor: "#F8E1A1",
    color: "#FF9800",
    padding: "1px",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "20px",
    textTransform: "uppercase",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    gap: "0.5rem",
    fontSize: "10px",
    cursor: "pointer", 
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#F6C768", 
      transform: "scale(1.05)", 
    },
    "&:active": {
      transform: "scale(0.95)", 
    }
  }}
  onClick={() => handleUpdate(product)}
>
  Edit
</Box>

<Box
  sx={{
    backgroundColor: "#FBE9E7",
    color: "#F44336",
    padding: "1px",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "20px",
    textTransform: "uppercase",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    gap: "0.5rem",
    fontSize: "10px",
    cursor: "pointer", 
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#F8C1BE", 
      transform: "scale(1.05)", 
    },
    "&:active": {
      transform: "scale(0.95)", 
    }
  }}
  onClick={() => handleDelete(product._id)}
>
  Delete
</Box>


  
  </Box>
</CardContent>



             
             
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Lead;
