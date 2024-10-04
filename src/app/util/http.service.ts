import axios, { AxiosError, AxiosResponse } from 'axios';

const getOptions = () => {

  const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: '',
      params: {},
      paramsSerializer: {indexes: null},
      timeout: 60*1000,
  }
  return options;
}

const getOptionsV2 = () => {
    const options = {
        headers: {
        },
        body: '',
        params: {},
        timeout: 60*1000*5,
    }
    return options;
}

const getErrorObject = (err: AxiosError | any) => {
  let errorObj = {};
  const additionalDescriptionFn = (val: any) =>{
    const tempArr: string[] = []
    if(val){
      var keys = Object.keys(val);
      keys.forEach(key => {
        tempArr.push(...val[key])
      })
    }
    return tempArr;
  }

  if(err.code ==='ECONNABORTED'){
    errorObj = {
        isError: true,
        message: "API Timeout",
        description: "The timeout period elapsed prior to completion of the operation or the server is not responding",
        type: 'error'
      };
  } else {
    errorObj = {
      isError: true,
      message:   err?.response?.data?.title ||err?.response?.data?.errorCode || err?.response?.statusText || err?.code,
      description: err?.response?.data?.detail || err?.message,
      additionalDescription: additionalDescriptionFn(err?.response?.data?.validationErrors),
      type: 'error'
    }
  }
  return errorObj;
}

const getAPI = (url: string, params?: any) => {
  const options = getOptions();
  options.params = params
  return axios.get(url, options).then((res: AxiosResponse) => { return Promise.resolve(res) })
    .catch((err: AxiosError) => {
      const errorObj = getErrorObject(err);
      return Promise.reject(errorObj);
    })
}

const getAPIV2 = (url: string, responseType: 'blob', params?: any) => {
  const options: any = getOptionsV2();
  options.params = params;
  options.responseType = responseType;
  // options.withCredentials = true;
  return axios.get(url, options).then((res: AxiosResponse) => {return Promise.resolve(res) })
      .catch((err: AxiosError) => {
        const errorObj = getErrorObject(err);
        return Promise.reject(errorObj);
      })
}


const deleteAPI = (url: string, body?: any) => {
  const options = getOptions();
  return axios.delete(url, options).then((res: AxiosResponse) => { return Promise.resolve(res) })
    .catch((err: AxiosError) => {
        const errorObj = getErrorObject(err);
      return Promise.reject(errorObj);
    })
}


export {
  getErrorObject,
  getAPI,
  deleteAPI,
  getAPIV2
}
