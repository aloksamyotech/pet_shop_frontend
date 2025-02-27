import axios from 'axios';


export const postApi = async (url, data, headers = {}) => {
  try {
      const defaultHeaders = {
          'Content-Type': 'application/json',
          ...headers
      };
      const response = await axios.post(url, data, { headers: defaultHeaders });
      return response.data;
  } catch (error) {
      console.error('API Error:', error.response || error.message);
      throw new Error(error.response ? error.response.data : error.message);
  }
};


export const postApiLogin = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
     });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
};





export const postApiImage = async (url, data, headers = {}) => {
  try {
    const defaultHeaders = {
      ...headers,
      'Content-Type': 'multipart/form-data'
    };
    const response = await axios.post(url, data, { headers: defaultHeaders });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const postApiForFormData = async (url, data, headers = {}) => {
  try {
    const defaultHeaders = {
      ...headers,
      'Content-Type': 'multipart/form-data'
    };
    const response = await axios.post(url, data, { headers: defaultHeaders });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const getApi = async (url, params = {}, headers = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    const response = await axios.get(url, {
      headers: defaultHeaders,
      params: params
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
export const updateApi = async (url, data, headers = {}) => {
  try {
   
    const isFormData = data instanceof FormData;
    const defaultHeaders = {
      
      ...headers,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
    };
    const response = await axios.put(url, data, { headers: defaultHeaders });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};


export const updateApiFormData= async (url, data, headers = {}) => {
  try {
   
    const isFormData = data instanceof FormData;
    const defaultHeaders = {
     
      ...headers,
      ...(isFormData ? {} : {  'Content-Type': 'multipart/form-data' })
    };
    const response = await axios.put(url, data, { headers: defaultHeaders });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteApi = async (url, headers = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    const response = await axios.delete(url, { headers: defaultHeaders });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
