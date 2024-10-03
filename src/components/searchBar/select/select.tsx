import { ComboboxData, ComboboxItem, Select } from "@mantine/core"

export default function Selector({selector, label, placeholder, onPickVal, value}:{selector: ComboboxData, label: string, placeholder: string, onPickVal: (value: string|null, option: ComboboxItem)=>void, value: string|undefined}){
    return (
        <Select label={label} data={selector} placeholder={placeholder} onChange={onPickVal} value={value!==undefined?value:undefined}></Select>
    )
}