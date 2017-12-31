import React from 'react';

export const fieldError = (error) => {
    return (
        error ?
            <div className="alert alert-danger">{error}</div> :
            ""
    );
};