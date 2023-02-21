import * as React from 'react';
import { UserTutorialList } from '../../../src/components/main/user/tutorialList';

interface HomePageProps { }

const UsersTutorialList: React.FC<HomePageProps> = () => {
    return (
        <UserTutorialList />
    );
}

export default  UsersTutorialList;