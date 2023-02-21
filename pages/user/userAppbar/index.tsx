import * as React from 'react';
import UserAppbar from '../../../src/components/main/user/appbar';

interface HomePageProps { }

const UsersAppbar: React.FC<HomePageProps> = () => {
    return (
        <UserAppbar />
    );
}

export default UsersAppbar;