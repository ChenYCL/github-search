import React from "react";
import {formatNumber} from "utils/index";

interface IProps{
    options: Array<{label:string,value:string}>;
    resultsCounts?: { [key: string]: number };
    activeOption: string;
    onChange: (value:string)=>void;
}

const Tabs: React.FC<IProps> =({
    options,
    activeOption,
    resultsCounts = {},
    onChange
})=>{

    return (
      <div className='w-full flex md:justify-center  justify-start px-[20px] '>
        <div className="flex flex-wrap flex-row   justify-start space-x-2  ">
            {
                options.map((option,key)=>(
                    <button
                    key={key}
                    type='button'
                    className={`mt-2 text-red px-4 py-2 rounded-md font-medium focus:outline-none transition-all duration-200 ease-in-out shadow-md ${option.value === activeOption ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={()=>{onChange(option.value)}}
                    >
                        {option.label}
                        {resultsCounts[option.value] ? `(${formatNumber(resultsCounts[option.value])})` : ''}
                    </button>
                ))
            }
        </div>
      </div>
    )
}

export default Tabs
