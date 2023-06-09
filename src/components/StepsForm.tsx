import onefill from "../assets/svgs/numbers/one-fill.svg";
import React, { useState } from "react";

export const StepsForm: React.FC<{
    setStepsState: (value: number) => void;
    children: any;
}> = ({ setStepsState, children }) => {
    return (
        <div className="flex items-start justify-end w-[60vw] xl:justify-center xl:w-[85vw]">
            <div className="flex xl:justify-center xl:items-center xl:w-[90vw] xl:h-[100px] w-[300px] h-[500px]">
                <div className="flex gap-2 flex-col rounded-3xl h-[106%] w-[100%] justify-center items-center bg-neutral-950 border-white border-2 shadow-md shadow-black text-white">
                    <div className="flex text-xl mb-10 xl:mb-0">
                        <strong>Etapas</strong>
                    </div>
                    <div className="flex flex-col xl:h-[50px] items-center xl:flex-row">
                        <img
                            className="h-[40px] xl:mb-1"
                            src={onefill}
                            alt="Number one icon"
                        />
                        <hr className="h-[30px] m-5 xl:m-0 xl:mx-8 xl:rotate-90 w-[2px] bg-white" />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
