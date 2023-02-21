import type { NextPage } from 'next'
import * as React from 'react';
import ExamsComponent from '../../../src/components/main/admins/exams';

interface ExercisesPageProps { }

const ExercisesPage: React.FC<ExercisesPageProps> = () => {
    return (
        <ExamsComponent />
    );
}

export default ExercisesPage;
