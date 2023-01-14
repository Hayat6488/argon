import baseApi from "../../api/baseApi";
import {defaultPage,defaultShowPerPage,defaultSearchTerm} from "../../constants/defaultTableHelper.json"

export const getAllBranch = async (page,showPerPage,searchTerm)=>{
    try {
        const response = await baseApi.get(`/api/getAllBranch?page=${page}&limit=${showPerPage}&search=${searchTerm}`);
        if (response.statusText !== "OK"){
            console.log("Something Went Wrong");
        }else{
            return response.data;
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const deleteBranch = async (id) =>{
    try {
        const response = await baseApi.delete(`/api/deleteOneBranch/${id}`);
        if (response.statusText !== "OK"){
            console.log("Something Went Wrong");
        }else{
            const allBranch = await getAllBranch(defaultPage,defaultShowPerPage,defaultSearchTerm);
            return {allBranch:allBranch?.data,deleteStatus:response?.data?.message}
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const getOneBranch = async (id)=>{

    try {
        const response = await baseApi.get(`/api/getOneBranch/${id}`);
        if (response.statusText !== "OK"){
            console.log("Something Went Wrong");
        }else{
            return response.data;
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const updateOneBranch = async (id,branchName,schoolName,email,currency,mobileNo,currencySymbol,address,finalLogo,oldPhoto) =>{
    const payload = new FormData();
    payload.append("branchName",branchName);
    payload.append("schoolName",schoolName);
    payload.append("email",email);
    payload.append("mobileNo",mobileNo);
    payload.append("currency",currency);
    payload.append("currencySymbol",currencySymbol);
    payload.append("address",address);
    payload.append("oldPhoto",oldPhoto);
    payload.append("icon",finalLogo);
    try {
        const response = await baseApi.put(`/api/updateOneBranch/${id}`,payload,{
            headers:{"Content-type":"application/json"}
        });
        if (response.statusText !== "OK"){
            console.log("Something Went Wrong");
        }else {
            return response?.data?.message;
        }
    }catch (e) {
        console.log(e.response);
    }
}
