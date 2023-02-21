import * as React from 'react';
import UserProfileComponent from '../../../src/components/main/user/profile';

interface HomePageProps { }

const UsersProfilePage: React.FC<HomePageProps> = () => {
    return (
        <UserProfileComponent />
    );
}

export default  UsersProfilePage;