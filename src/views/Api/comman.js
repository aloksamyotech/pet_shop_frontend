import axios from 'axios';
import { toast } from 'react-toastify';
import { decryptWithAESKey } from 'common/decrypto';



export const postApiRegistration = async (url, data, headers = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };

    const response = await axios.post(url, data, { headers: defaultHeaders });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  // if (response.status === 200) {
  //     return response.data;
  //   } else {
  //     throw new Error('Failed to register');
  //   }
  } catch (error) {
   
    console.error('API Error:', error.response ? error.response.data : error.message);
    toast.error(error?.response?.data?.message || 'An error occurred');
    throw new Error(error.response ? error.response.data : error.message);
  }
};




export const postApi = async (url, data, headers = {}) => {
  try {
    const defaultHeaders = {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
      ...headers
    };
    const response = await axios.post(url, data, { headers: defaultHeaders });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    console.error('API Error:', error.response || error.message);
    toast.error(error?.response?.data?.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const postApiLogin = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    console.error('API Error:', error.response || error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const postApiImage = async (url, data, headers = {}) => {
  try {
    const defaultHeaders = {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data'
    };
    const response = await axios.post(url, data, { headers: defaultHeaders });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const postApiForFormData = async (url, data, headers = {}) => {
  try {
    const defaultHeaders = {
      ...headers,
      // authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data'
    };
    const response = await axios.post(url, data, { headers: defaultHeaders });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    // throw new Error(error.response ? error.response.data : error.message);
  }
};

export const getApi = async (url, params = {}, headers = {}) => {
  try {
    const defaultHeaders = {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
      ...headers
    };
    const response = await axios.get(url, {
      headers: defaultHeaders,
      params: params
    });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const updateApi = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;

    const defaultHeaders = {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
    };
    const response = await axios.put(url, data, { headers: defaultHeaders });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const updateApiFormData = async (url, data, headers = {}) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    console.error('API Update Error:', error);

    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
      throw new Error(JSON.stringify(error.response.data));
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Request Error:', error.message);
      throw new Error(error.message);
    }
  }
};

export const deleteApi = async (url, headers = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      ...headers
    };
    const response = await axios.delete(url, { headers: defaultHeaders });
    let responseData = await decryptWithAESKey(response.data);
    return JSON.parse(responseData);
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
