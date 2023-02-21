import * as React from 'react';
import { UserExamList } from '../../../src/components/main/user/examList';


interface HomePageProps { }

const UsersExamList: React.FC<HomePageProps> = () => {
    return (
        <UserExamList/>
    );
}

export default  UsersExamList;