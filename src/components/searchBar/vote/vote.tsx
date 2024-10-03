import { NumberInput } from "@mantine/core";

export default function VoteInput({placeholder, label, onVote, value}:{placeholder:string, label: string|undefined, onVote:(value:number|string)=>void, value: number|undefined}){
    return(
        <NumberInput placeholder={placeholder} label={label===undefined?'':label} max={10} min={1} style={label===undefined?{marginTop: "25px"}:{}} onChange={onVote} value={value}></NumberInput>
    )
}