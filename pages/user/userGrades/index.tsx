import * as React from 'react';
import Grades from '../../../src/components/main/user/grades';

interface HomePageProps { }

const UserGrades: React.FC<HomePageProps> = () => {
    return (
        <Grades />
    );
}

export default  UserGrades;