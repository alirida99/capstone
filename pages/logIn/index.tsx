import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import LoginComponent from '../../src/components/main/logIn';

interface LoginPageProps { }

const LoginPage: React.FC<LoginPageProps> = () => {
    return (
        <LoginComponent />
    );
}

export default LoginPage;
