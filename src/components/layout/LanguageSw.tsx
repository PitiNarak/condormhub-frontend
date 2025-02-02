'use client'
import React from "react";

//It is for the tailwind to work with the dynamic classname
const bgc1 = "bg-white"
const bgc2 = "bg-black"
const txtc1 = "text-white"
const txtc2 = "text-black"
const bold = "font-bold"

export default function LanguageSw() {
    const [EN_TH, setEN_TH] = React.useState(true)
    let toggle = () => {
        setEN_TH(!EN_TH)
        console.log(EN_TH)
    }
    return (
        <div className="flex-1 border-red-700 border-">
                <button className={`${!EN_TH ? bgc1 : bgc2} ${EN_TH ? txtc1 : txtc2} disabled: px-5 py-3 rounded-l ${!EN_TH ? "font-bold" :""}`} onClick={toggle}>TH</button>
                
                <button className={`${EN_TH ? bgc1 : bgc2} ${!EN_TH ? txtc1 : txtc2} px-5 py-3 rounded-r ${EN_TH ? "font-bold" :""}`} onClick={toggle}>EN</button>
        </div>
    );
}