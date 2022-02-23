import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

interface Props{
    children: string,
    type?: "button" | "submit" | "reset" | undefined,
    fn?: () => void,
};

const MyButton: React.FC<Props> = ({ children, type = "button", fn }) => {
    
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#8e24aa"),
        backgroundColor: "#8e24aa",
        '&:hover': {
            backgroundColor: "#7b1fa2",
        },
        borderRadius: "5px"
    }));

    return (
        <div className='flex justify-center items-center'>
            <ColorButton
                onClick={fn}
                type={type}
                variant="contained">
                {children}
            </ColorButton>
        </div>
    );
}

export default MyButton