import React from 'react';
import { useAuth } from '../Context/useAuth';
import { Button } from '@mui/material';

type LogOutButtonProps = {
    // Define any props you need for the component here
};

const LogOutButton: React.FC<LogOutButtonProps> = (props) => {
    // Add your component logic here
    const {logout} = useAuth();

 
    function handleLogout(): void {
        logout();
    }

    return (
        // JSX code for your component goes here
        <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={handleLogout}
          
      >
        Log Out
      </Button>
    );
};

export default LogOutButton;