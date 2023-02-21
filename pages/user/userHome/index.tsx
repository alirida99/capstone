
import * as React from 'react';
import UserHomeComponent from '../../../src/components/main/user/home';

interface HomePageProps { }

const UsersHomePage: React.FC<HomePageProps> = () => {
    return (
        <UserHomeComponent />
    );
}

export default  UsersHomePage;