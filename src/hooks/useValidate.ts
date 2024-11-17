import React, {useEffect, useState} from 'react'

const lettersRegExp = /[^\u0401\u0451\u0410-\u044fA-z\s]/g

export const useValidate = ( ...state ) => {
    
    const [errors, setErrors] = useState<Record<string,string>>({}); 

    useEffect(() => { 
        validateForm();
    }, [ ...state ]); 
  
    const validateForm = () => { 
        
        let errors: Record<string, string> = {}; 
        
        for ( const property of state ) {

            if( lettersRegExp.test(property) ) {
                errors[property] = 'Only letters'
            }

        }

        setErrors(errors); 
    }; 

  
    return {
        errors,
        setErrors
    }
}