import React from 'react';

import axios from "axios";

const BASE_SERVER_URL = 'http://localhost:8080/api';
 export default class Api {

     static  axiosPostApi(requestURL, paramObject, resolve, reject ){
         const URL = BASE_SERVER_URL+requestURL;
         console.log('URL===',URL,paramObject)
         return axios.post(URL, paramObject,{
             headers:{
                 'Content-Type': 'application/json'
             }
         }).then((response) =>{
             console.log('response URL======',response)
                 resolve(response);
         }).catch((error) =>{
                 reject(error);
         });
    }

     static axiosGetApi(requestURL, resolve, reject) {
         const URL = BASE_SERVER_URL+requestURL;
         return axios.get(URL).then(res=>res)
     }

 }
