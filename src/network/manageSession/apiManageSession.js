import baseApi from "../../api/baseApi";
import {defaultPage,defaultShowPerPage,defaultSearchTerm} from "../../constants/defaultTableHelper.json";

export const addSession = async (branchName,branchId,sessionName,startDate,endDate,status) => {
    const payload = {
        branchName:branchName,
        branchId:branchId,
        sessionName:sessionName,
        startDate:startDate,
        endDate:endDate,
        status:status
    }
    try {
        const response = await baseApi.post(`/api/addSession`,payload,{
            headers:{"Content-type":"application/json"}
        });
        if (response.statusText !== "OK"){
            return `"danger","Something Went Wrong","Session"`;
        }else {
            return response?.data;
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const getAllSession = async (page,showPerPage,searchTerm) => {
    try {
        const response = await baseApi.get(`/api/getAllSession?page=${page}&limit=${showPerPage}&search=${searchTerm}`);
        if (response.statusText !== "OK"){
            return "Something Went Wrong"
        } else {
            return response?.data;
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const updateOneSession = async (id,branchName,branchId,sessionName,startDate,endDate,status) =>{
    const payload = {
        branchName: branchName,
        branchId: branchId,
        sessionName:sessionName,
        startDate:startDate,
        endDate:endDate,
        status:status
    };
    try {
        const response = await baseApi.put(`/api/updateOneSession/${id}`,payload,{
            headers:{"Content-type":"application/json"}
        });
        if (response.statusText !== "OK"){
            return "Something Went Wrong";
        }else {
            return response?.data?.message;
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const getOneSession = async (id)=>{
    try {
        const response = await baseApi.get(`/api/getOneSession/${id}`);
        if (response.statusText !== "OK"){
            console.log("Something Went Wrong");
        }else{
            return response.data;
        }
    }catch (e) {
        console.log(e.response);
    }
};

export const deleteSession = async (id) =>{
    try {
        const response = await baseApi.delete(`/api/deleteOneSession/${id}`);
        if (response.statusText !== "OK"){
            return "Something Went Wrong";
        }else{
            const allSession = await getAllSession(defaultPage,defaultShowPerPage,defaultSearchTerm);
            return {allSession:allSession?.data,deleteStatus:response?.data?.message}
        }
    }catch (e) {
        console.log(e.response);
    }
};
