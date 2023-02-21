import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import HomeComponent from '../src/components/main/home';

const Home: NextPage = () => {
 
  return (
    <HomeComponent />
  );
}

export default Home
