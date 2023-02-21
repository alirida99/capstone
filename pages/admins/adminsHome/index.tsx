import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import AdminsHomeComponent from '../../../src/components/main/admins/home';
import UsersComponent from '../../../src/components/main/admins/users';

interface HomePageProps { }

const AdminsHomePage: React.FC<HomePageProps> = () => {
    return (
        <UsersComponent />
    );
}

export default AdminsHomePage;
