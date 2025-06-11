import React from 'react';
import './PetwearHouse.css';
import { useState, useEffect } from 'react';
import { urls } from 'views/Api/constant';
import { postApiRegistration, getApi } from 'views/Api/comman';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import { TextField } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const shareImages = [
  'https://media.istockphoto.com/id/1060529042/photo/young-woman-with-dog.jpg?s=612x612&w=0&k=20&c=s0AlJrCZUUX4EXzwpwxobfUbeqUnghp0FpdHXHx3mpk=',
  'https://media.istockphoto.com/id/1332433294/photo/puppy-and-man.jpg?s=612x612&w=0&k=20&c=63Xdp6sbjijY3AV8O_7yLafVbIrQQwtp2dRiy4aJiVs=',
  'https://media.istockphoto.com/id/847404802/photo/best-friends.jpg?s=612x612&w=0&k=20&c=g0yBFxBehnqWGgxz0dN1BEaXquxc8kfdqSg01qmc8sw=',
  'https://media.istockphoto.com/id/1301158790/photo/close-up-portrait-of-a-beautiful-cheerful-young-woman-with-a-cute-gray-cat-in-her-arms-at-home.jpg?s=612x612&w=0&k=20&c=SsSED7uV9ERZau_iCfOHfHBdBTU_gLktm-t9uanlkD4=',
  'https://media.istockphoto.com/id/1261388192/photo/brunette-female-in-knitted-sweater-with-her-fluffy-cat.jpg?s=612x612&w=0&k=20&c=bvkKx1Xj8O3Hqc4vXpolGXH5GW5aZXIOWMy_6LiGn2w=',
  'https://media.istockphoto.com/id/2203064355/photo/woman-taking-a-selfie-with-her-miniature-schnauzer-on-the-sofa-at-home.jpg?s=612x612&w=0&k=20&c=jeIdy1Pg-8Fj8FPa07Y2gEAwxLrThMDiBS3sPn--SdY=',
  'https://media.istockphoto.com/id/664708182/photo/senior-woman-in-the-park.jpg?s=612x612&w=0&k=20&c=GHgY03SVkYou0YgAwNGORylp8XKqPt1tlKpcXWlpJ28='
];

const PetWarehouse = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showAll, setShowAll] = useState(false);
  const [pacKageData, setPackageData] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [pacKage, setPackage] = useState([]);
  const visibleData = showAll ? pacKageData : pacKageData.slice(0, 6);
  const [petType, setPetType] = useState([]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    petType: '',
    pacKage: '',
    gender: '',
    petAge: '',
    service: '',
    size: '',
    startDate: '',
    endDate: '',
    pickupLocation: ''
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
      .max(20, 'You cannot enter more than 20 characters')
      .required('Customer name is required'),

    email: Yup.string().email('Invalid email').required('email is required'),
    city: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
      .max(20, 'You cannot enter more than 20 characters')
      .required('City name is required'),

    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Only numbers allowed')
      .length(10, 'Must be exactly 10 digits')
      .required('phone number is required'),
    petType: Yup.string().required('Please select pet type'),
    pacKage: Yup.string().required('Please select package'),
    gender: Yup.string().required('Please select pet gender'),
    petAge: Yup.string().required('Please select petAge'),
    service: Yup.string().required('Please select service'),
    size: Yup.string().required('Please select pet size'),
    pickupLocation: Yup.string().when('service', {
      is: 'staff',
      then: Yup.string().required('"Please select pickupLocation')
    }),
    startDate: Yup.date().min(new Date()).required('Please select stat date'),
    endDate: Yup.date().min(Yup.ref('startDate'), 'End date must be after start date').required('Please select end date')
  });

  const fetchPackageData = async () => {
    try {
      const response = await getApi(urls.package.get);

      const categoryData = response?.data?.data || [];
      setPackageData(categoryData);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullData = {
      ...formData,
      startDate,
      endDate
    };

    try {
      const response = await postApiRegistration(urls.registration.create, fullData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response) {
        toast.success('Booking successful!');
        setFormData({
          name: '',
          email: '',
          city: '',
          phone: '',
          petType: '',
          pacKage: '',
          gender: '',
          petAge: '',
          service: '',
          size: '',
          startDate: '',
          endDate: '',
          pickupLocation: ''
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

      setPackage(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };
  const fetchDataPetType = async () => {
    try {
      const res = await getApi(urls.petType.get);

      setPetType(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching petType:', error);
    }
  };

  useEffect(() => {
    fetchDataPetType();
    fetchData();
    fetchPackageData();
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
              At Pet Shop, we treat your pets like royalty. Our services range from professional grooming to high-quality pet products —
              everything tailored to your furry friend’s happiness.
            </p>
          </div>
        </div>
      </section>

      <section className="grooming-section" id="grooming">
        <h2>🐶 Grooming Services</h2>

        <div className="grooming-cards">
          {visibleData.map((item, index) => (
            <div className="card" key={index}>
              <img
                src={
                  item.imageUrl ||
                  'https://media.istockphoto.com/id/1308719194/photo/golden-retriver-dog-taking-a-shower-in-a-pet-grooming-salon.jpg?s=612x612&w=0&k=20&c=PM8Mnp4J3a8pO0i3aVFmd58JQnDycEOmbZy2kL_hPFo='
                }
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {pacKageData.length > 6 && (
          <div className="view-all-btn-wrapper" style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button onClick={() => setShowAll(!showAll)} className="view-all-button">
              {showAll ? 'Close' : 'View All'}
            </button>
          </div>
        )}
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
          <Formik
            initialValues={{
              name: '',
              email: '',
              city: '',
              phone: '',
              petType: '',
              pacKage: '',
              gender: '',
              petAge: '',
              service: '',
              size: '',
              pickupLocation: '',
              startDate: startDate,
              endDate: endDate
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const fullData = {
                ...values,
                startDate,
                endDate
              };

              try {
                const response = await postApiRegistration(urls.registration.create, fullData, {
                  headers: { 'Content-Type': 'application/json' }
                });

                if (response) {
                  toast.success('Booking successful!');
                  resetForm();
                  setStartDate(new Date());
                  setEndDate(new Date());
                } else {
                  throw new Error('Failed to register');
                }
              } catch (error) {
                console.error('Error during registration:', error);
                toast.error('Failed to register');
              }
            }}
          >
            {({ values, handleChange, setFieldValue, errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="form-field">
                    <Field name="name">
                      {({ field, form }) => {
                        const value = form.values.name || '';
                        const maxLength = 20;

                        return (
                          <>
                            <input
                              {...field}
                              placeholder="Name"
                              value={value}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, '');

                                if (cleaned.length <= maxLength) {
                                  form.setFieldValue('name', cleaned);
                                  form.setFieldError('name', '');
                                } else {
                                  form.setFieldError('name', 'You cannot enter more than 20 characters');
                                }
                              }}
                            />
                          </>
                        );
                      }}
                    </Field>
                    <ErrorMessage name="name" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field name="email" placeholder="Email" type="email" />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field name="city">
                      {({ field, form }) => {
                        const value = form.values.city || '';
                        const maxLength = 20;

                        return (
                          <>
                            <input
                              {...field}
                              placeholder="City"
                              value={value}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, '');

                                if (cleaned.length <= maxLength) {
                                  form.setFieldValue('city', cleaned);
                                  form.setFieldError('city', '');
                                } else {
                                  form.setFieldError('city', 'You cannot enter more than 20 characters');
                                }
                              }}
                            />
                          </>
                        );
                      }}
                    </Field>
                    <ErrorMessage name="city" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field name="phone">
                      {({ field, form }) => (
                        <input
                          {...field}
                          placeholder="Phone Number"
                          maxLength="10"
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            form.setFieldValue('phone', value);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="phone" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field as="select" name="petType">
                      <option value="">Select petType</option>
                      {petType.map((pet) => (
                        <option key={pet._id} value={pet.name}>
                          {pet.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="petType" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field as="select" name="pacKage">
                      <option value="">Select Package</option>
                      {pacKage.map((pkg) => (
                        <option key={pkg._id} value={pkg._id}>
                          {pkg.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="pacKage" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field as="select" name="gender">
                      <option value="">Pet Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="error" />
                  </div>
                  <div className="form-field">
                    <Field as="select" name="petAge">
                      <option value="">Select Pet Age</option>
                      <option value="1-6 months">1-6 Months</option>
                      <option value="6-12 months">6-12 Months</option>
                      <option value="1-2 years">1-2 Years</option>
                      <option value="2-5 years">2-5 Years</option>
                      <option value="5+ years">5+ Years</option>
                    </Field>
                    <ErrorMessage name="petAge" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field as="select" name="size">
                      <option value="">Select Pet Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </Field>
                    <ErrorMessage name="size" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <Field as="select" name="service">
                      <option value=""> Pickup Service</option>
                      <option value="self">Self</option>
                      <option value="staff">Staff</option>
                    </Field>
                    <ErrorMessage name="service" component="div" className="error" />
                  </div>

                  {values.service === 'staff' && (
                    <div className="form-field">
                      <Field name="pickupLocation" placeholder="Pickup Location" />
                      <ErrorMessage name="pickupLocation" component="div" className="error" />
                    </div>
                  )}

                  <div className="form-field">
                    <DatePicker
                      selected={values.startDate}
                      onChange={(date) => setFieldValue('startDate', date)}
                      showTimeSelect
                      minDate={new Date()}
                      minTime={
                        values.startDate && new Date(values.startDate).toDateString() === new Date().toDateString()
                          ? new Date()
                          : new Date().setHours(0, 0, 0)
                      }
                      maxTime={new Date().setHours(23, 59)}
                      dateFormat="Pp"
                      customInput={<TextField fullWidth label="Start Date" />}
                    />

                    <ErrorMessage name="startDate" component="div" className="error" />
                  </div>

                  <div className="form-field">
                    <DatePicker
                      selected={values.endDate}
                      onChange={(date) => setFieldValue('endDate', date)}
                      showTimeSelect
                      minDate={values.startDate || new Date()}
                      filterTime={(time) => {
                        if (values.startDate && new Date(time).toDateString() === new Date(values.startDate).toDateString()) {
                          return new Date(time).getTime() > new Date(values.startDate).getTime();
                        }
                        return true;
                      }}
                      dateFormat="Pp"
                      customInput={<TextField fullWidth label="End Date" />}
                    />
                    <ErrorMessage name="endDate" component="div" className="error" />
                  </div>

                  <div className="form-submit">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="info-panel">
          <div className="info-content">
            <h1>🐾 Grooming Services</h1>
            <p>
              Your pet deserves the best! We offer <strong>spa baths</strong>, <strong>haircuts</strong>, <strong>nail trimming</strong>,
              and more. Trust our trained groomers to make your pet look and feel amazing.
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
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PetWarehouse;
