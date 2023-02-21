import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import AdminsLoginComponent from '../../../src/components/main/admins/adminsLogin';

interface LoginPageProps { }

const AdminsLoginPage: React.FC<LoginPageProps> = () => {
    return (
        <AdminsLoginComponent />
    );
}

export default AdminsLoginPage;
