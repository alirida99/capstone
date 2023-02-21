import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import SignUpComponent from '../../src/components/main/signUp';

interface SignUpPageProps { }

const SignUpPage: React.FC<SignUpPageProps> = () => {
    return (
        <SignUpComponent />
    );
}

export default SignUpPage;
