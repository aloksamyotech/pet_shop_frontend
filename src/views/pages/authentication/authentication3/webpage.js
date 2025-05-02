import React from "react";
import "./PetwearHouse.css";
import { useState } from "react";
import { urls } from "views/Api/constant";
import { postApiRegistration , getApi} from "views/Api/comman";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import DatePicker from 'react-datepicker';
import { TextField } from "@mui/material";
import 'react-datepicker/dist/react-datepicker.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useEffect } from "react";



const dogGroomingServices = [
  {
    title: "Basic Packages",
    description: "Includes bath, haircut, nail trimming, ear cleaning and brushing.",
    image: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
  },
  {
    title: "Standard Packages",
    description: "Gentle bathing with pet-friendly shampoo and full body brushing.",
    image: "https://media.istockphoto.com/id/1308719194/photo/golden-retriver-dog-taking-a-shower-in-a-pet-grooming-salon.jpg?s=612x612&w=0&k=20&c=PM8Mnp4J3a8pO0i3aVFmd58JQnDycEOmbZy2kL_hPFo=",
  },
  {
    title: "Premium Packages",
    description: "Safe and careful trimming of your pet's nails.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7LAr3bV0hYnztSswRqbmOobCw0-ieCM8VsQ&s",
  },
];

const shareImages = [
  "https://media.istockphoto.com/id/1060529042/photo/young-woman-with-dog.jpg?s=612x612&w=0&k=20&c=s0AlJrCZUUX4EXzwpwxobfUbeqUnghp0FpdHXHx3mpk=",
  "https://media.istockphoto.com/id/1332433294/photo/puppy-and-man.jpg?s=612x612&w=0&k=20&c=63Xdp6sbjijY3AV8O_7yLafVbIrQQwtp2dRiy4aJiVs=",
  "https://media.istockphoto.com/id/847404802/photo/best-friends.jpg?s=612x612&w=0&k=20&c=g0yBFxBehnqWGgxz0dN1BEaXquxc8kfdqSg01qmc8sw=",
  "https://media.istockphoto.com/id/1301158790/photo/close-up-portrait-of-a-beautiful-cheerful-young-woman-with-a-cute-gray-cat-in-her-arms-at-home.jpg?s=612x612&w=0&k=20&c=SsSED7uV9ERZau_iCfOHfHBdBTU_gLktm-t9uanlkD4=",
  "https://media.istockphoto.com/id/1261388192/photo/brunette-female-in-knitted-sweater-with-her-fluffy-cat.jpg?s=612x612&w=0&k=20&c=bvkKx1Xj8O3Hqc4vXpolGXH5GW5aZXIOWMy_6LiGn2w=",
  "https://media.istockphoto.com/id/2203064355/photo/woman-taking-a-selfie-with-her-miniature-schnauzer-on-the-sofa-at-home.jpg?s=612x612&w=0&k=20&c=jeIdy1Pg-8Fj8FPa07Y2gEAwxLrThMDiBS3sPn--SdY=",
  "https://media.istockphoto.com/id/664708182/photo/senior-woman-in-the-park.jpg?s=612x612&w=0&k=20&c=GHgY03SVkYou0YgAwNGORylp8XKqPt1tlKpcXWlpJ28=",
];

const PetWarehouse = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pacKage,setPackage] = useState([]);
  const [petType, setPetType] = useState([])
const navigate = useNavigate()
const [formData, setFormData] = useState({
  name: "",
  email: "",
  city: "",
  phone: "",
  petType: "",
  pacKage: "",
  gender: "",
  petAge: "",
  service: "", 
  size: "",
  startDate: "",
  endDate: "",
  pickupLocation: "",
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const fullData = {
    ...formData,
    startDate,
    endDate,
  };

console.log("fulldata0000000000000000000000",fullData);


  try {
    const response = await postApiRegistration(urls.registration.create, fullData, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (response) {
      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        city: "",
        phone: "",
        petType: "",
        pacKage: "",
        gender: "",
        petAge: "",
        service: "",
        size: "",
        startDate: "",
        endDate: "",
        pickupLocation: "",
      });
      setStartDate(new Date());
  setEndDate(new Date());
    } else {
      throw new Error('Failed to register');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    toast.error('Failed to register');
  }
};

const fetchData = async () => {
  try {
    const res = await getApi(urls.package.get);
    console.log("res---------", res);
    setPackage(res?.data?.data || []);
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
};
const fetchDataPetType = async () => {
  try {
    const res = await getApi(urls.petType.get);
    console.log("res---------", res);
    setPetType(res?.data?.data || []);
  } catch (error) {
    console.error("Error fetching petType:", error);
  }
};

useEffect(() => {
 
  fetchDataPetType()
  fetchData();
}, []);

  

  return (
    <div className="container">
    
    <header className="top-bar">
  <div className="left">
    <h2>🐾 Pet Shop</h2>
  </div>
  <nav className="right">
    <a href="#home">Home</a>
    <a href="#grooming">Service</a>
    <a href="#happy-customers">About</a>
    <a href="#contact">Contact</a>
  </nav>
</header>


      <section className="intro-section" id="home">
  <div className="intro-overlay">
    <div className="intro-text">
      <h2>Welcome to Pet Shop</h2>
      <p>
        At Pet Shop, we treat your pets like royalty. Our services range from professional grooming 
        to high-quality pet products — everything tailored to your furry friend’s happiness.
      </p>
    </div>
  </div>
</section>







<section className="grooming-section" id="grooming">
        <h2>🐶 Grooming Services</h2>
        <div className="grooming-cards">
          {dogGroomingServices.map((service, index) => (
            <div className="card" key={index}>
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="share-section" id="happy-customers">
        <h2>💖 Happy Customers</h2>
        <div className="image-gallery">
          {shareImages.map((url, idx) => (
            <div className="gallery-card" key={idx}>
              <img src={url} alt="share pic" />
            </div>
          ))}
        </div>
      </section>

 
      <section className="booking-container" id="contact">
        <div className="form-panel">
        <h2 className="form-title">Book Now</h2>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <select
  name="petType"
  value={formData.petType}
  onChange={handleChange}
>
  <option value="">Select petType</option>
  {petType.map((pet) => (
    <option key={pet._id} value={pet.name}>
      {pet.name}
    </option>
  ))}
</select>
            {/* <select
  name="petType"
  value={formData.petType}
  onChange={handleChange}
>
  <option value="" disabled>Pet Type</option>
  <option value="dogs">Dogs</option>
  <option value="cat">Cat</option>
  <option value="small-pet">Small Pet</option>
</select> */}

<select
  name="pacKage"
  value={formData.pacKage}
  onChange={handleChange}
>
  <option value="">Select Package</option>
  {pacKage.map((pkg) => (
    <option key={pkg._id} value={pkg._id}>
      {pkg.name}
    </option>
  ))}
</select>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
  name="petAge"
  value={formData.petAge}
  onChange={handleChange}
>
  <option value="" disabled>Select Pet Age</option>
  <option value="1-6 months">1-6 Months</option>
  <option value="6-12 months">6-12 Months</option>
  <option value="1-2 years">1-2 Years</option>
  <option value="2-5 years">2-5 Years</option>
  <option value="5+ years">5+ Years</option>
</select>

             <select
  name="service"
  value={formData.service}
  onChange={handleChange}
>
  <option value="">Service</option>
  <option value="self">Self</option>
  <option value="staff">Staff</option>
</select>

{formData.service === "staff" && (
  <input
    type="text"
    name="pickupLocation"
    value={formData.pickupLocation}
    onChange={handleChange}
    placeholder="pickupLocation"
  />
)}

<select
  name="size"
  value={formData.size}
  onChange={handleChange}
>
  <option value="" disabled>Select Pet Size</option>
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  <option value="extra-large">Extra Large</option>
</select>




  <DatePicker
    selected={startDate}
    onChange={(date) => {
      setStartDate(date);
      setFormData((prev) => ({ ...prev, startDate: date }));
      if (endDate < date) {
        setEndDate(date);
        setFormData((prev) => ({ ...prev, endDate: date }));
      }
    }}
    showTimeSelect
    minDate={new Date()}
    dateFormat="Pp"
    customInput={<TextField fullWidth label="Start Date" />}
  />



  <DatePicker
    selected={endDate}
    onChange={(date) => {
      setEndDate(date);
      setFormData((prev) => ({ ...prev, endDate: date }));
    }}
    showTimeSelect
    minDate={startDate}
    dateFormat="Pp"
    customInput={<TextField fullWidth label="End Date" />}
  />



            </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

  <div className="info-panel">
    <div className="info-content">
      <h1>🐾 Grooming Services</h1>
      <p>
        Your pet deserves the best! We offer <strong>spa baths</strong>, <strong>haircuts</strong>, <strong>nail trimming</strong>, and more.
        Trust our trained groomers to make your pet look and feel amazing.
      </p>
    </div>
  </div>
</section>


<footer className="footer">
  <div className="footer-container">
    <div className="footer-left">
      <p>support@petwarehouse.shop</p>
    </div>
 
  </div>


  <div className="footer-social-icons">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
  </div>
</footer>



    </div>
  );
};

export default PetWarehouse;
