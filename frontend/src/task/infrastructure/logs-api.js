import axios from 'axios'
import {LogsAssembler} from "./logs.assembler.js"

const API_URL = "http://localhost:3000/logs"

export class LogsApi{
    async getLogs(){
        try{
            const response = await axios.get(API_URL)
            return response.data.map((log)=>LogsAssembler.toEntityFromResponse(log))
        }catch(error){
            console.log(error)
        }
    }
}