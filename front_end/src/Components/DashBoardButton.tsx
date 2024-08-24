import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type LogOutButtonProps = {
    // Define any props you need for the component here
};

const DashBoardButton: React.FC<LogOutButtonProps> = (props) => {
    // Add your component logic here
    const navigate = useNavigate();

 
    function handleLogout(): void {
        navigate('/dashboard');    }

    return (
        // JSX code for your component goes here
        <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={handleLogout}
          
      >
        Back to Dashboard
      </Button>
    );
};

export default DashBoardButton;