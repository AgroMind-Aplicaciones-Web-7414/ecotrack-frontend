import axios from 'axios'
import {TaskAssembler} from "./task.assembler.js"

const API_URL = 'http://localhost:3000/tasks'

export class TaskApi{

    async getTasksCompleted(){
        const endpoint = `${API_URL}?status=Completed`;
        try{
            const response = await axios.get(endpoint);
            return response.data.map(task=> TaskAssembler.toEntityFromResponse(task))
        }catch(error){
            console.log(error)
        }
    }

    async getTasksInProgress(){
        const endpoint = `${API_URL}?status=InProgress`;
        try{
            const response = await axios.get(endpoint);
            return response.data.map(task=> TaskAssembler.toEntityFromResponse(task))
        }catch(error){
            console.log(error)
        }
    }

    async getTasksPending(){
        const endpoint = `${API_URL}?status=Pending`;
        try{
            const response = await axios.get(endpoint);
            return response.data.map(task=> TaskAssembler.toEntityFromResponse(task))
        }catch (error){
            console.log(error)
        }
    }

    async updateStatus(taskID, newStatus){
        const endpoint = `${API_URL}/${taskID}`
        try{
            const response = await axios.patch(endpoint, {status: newStatus})
            return response.data
        }catch(error){
            console.log(error)
        }
    }

    async updateCompletedDate(taskID, newCompletedDate){
        const endpoint = `${API_URL}/${taskID}`
        try{
            const response = await axios.patch(endpoint, {completedAt: newCompletedDate})
            return response.data
        }catch(error){
            console.log(error)
        }
    }

    async updateStartedDate(taskId, newStartedDate){
        const endpoint = `${API_URL}/${taskId}`
        try{
            const response = await axios.patch(endpoint, {startedAt: newStartedDate})
            return response.data
        }catch(error){
            console.log(error)
        }
    }

    async getTaskById(taskId){
        const stringId = String(taskId)
        const endpoint = `${API_URL}/${stringId}`
        try{
            const response = await axios.get(endpoint);
            return TaskAssembler.toEntityFromResponse(response.data)
        }catch(error){
            console.log(error)
        }
    }
}