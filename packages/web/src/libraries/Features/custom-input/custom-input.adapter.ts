import { useEffect, useRef } from 'react';
import { ICustomInput } from './custom-input.props';

function CustomInputAdapter(props : ICustomInput) {
    const inputRef = useRef<any>(null);

    const { value , setIsFocused , setValue , isTextArea , isMultiline , setIsMultiline , onChange } = props;

    useEffect(() => {
        if(inputRef.current && isTextArea){
            const ele = inputRef.current;
            ele.addEventListener("keypress" , (event: KeyboardEvent) =>{
                if (event.keyCode === 13 && !event.shiftKey) {
                    event.preventDefault();
                }
            })

            return () => {
                ele.removeEventListener("keypress" , (event: KeyboardEvent) =>{
                    if (event.keyCode === 13 && !event.shiftKey) {
                        event.preventDefault();
                    }
                })            
            }
        }
    });

    const changeValue = (e: any) =>{
        const value = e.target.value;
        setValue && setValue(value);
        
        const line = value.split("\n");

        if(isMultiline){
            const lineNum = line.length;
            if(inputRef.current){
                if(lineNum > 1){
                    inputRef.current.rows = 3;
                    setIsMultiline(true);
                } else{
                    inputRef.current.rows = 1;
                    setIsMultiline(false);
                }
            }
        }
    }

    const changeValue2 = (e: any) =>{
        onChange && onChange(e);
        const value = e.target.value;
        setValue && setValue(value);
    }

    const clearText = (e: any) =>{
        onChange && onChange(e);
        setValue && setValue("");
    }

    return {
        value ,
        changeValue,
        changeValue2,
        clearText,
        inputRef,
        setIsFocused
    }
}

export default CustomInputAdapter;
