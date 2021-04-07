import React, {Fragment} from 'react'
import {Button as ButtonB, Spinner} from 'react-bootstrap'


const Button = ({isLoading, text, variant, type}) => {
    return (
        <ButtonB
            variant={variant}
            disabled={isLoading}
            type={type}
            onClick={null}
        >
            {isLoading 
            ? 
            <Fragment>
            loading... 
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            /> 
            </Fragment>
            : text} 
        </ButtonB>
    )
}

export default Button