import axios from "axios"
import {ChecklistAssembler} from "./checklist.assembler.js"

const API_URL = "http://localhost:3000/checklists"

export class CheckListApi{
    async getCheckListByTaskId(taskId){
        const stringId = String(taskId)
        const endpoint = `${API_URL}?taskId=${stringId}`
        const response = await axios.get(endpoint)
        if (!response.data || response.data.length === 0) {
            console.warn(`API: No se encontró checklist para taskId=${stringId}`);
            return null;
        }
        return ChecklistAssembler.toEntityFromResponse(response.data[0])
    }
}