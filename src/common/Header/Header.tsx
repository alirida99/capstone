import { Box, Button, FormControl, Grid, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import router from "next/router";
import React from "react";
import styles from './header.module.scss';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box className={styles.header}>
            <Grid container>
                <Grid item xs={2} style={{ height: '75px', cursor: 'pointer' }} onClick={() => { router.push('/') }} >
                    <Image src='/myLogo.png' width={'73px'} height={'73px'} alt="logo" />
                </Grid>
                <Grid xs={7}></Grid>
                <Grid xs={3} className={styles.buttons}>
                    <div>
                        <Button className={styles.btnlog} onClick={handleMenu}>Log In</Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{ marginTop: '45px' }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Admins</MenuItem>
                            <MenuItem onClick={() => { router.push('/logIn') }}>Members</MenuItem>
                        </Menu>
                    </div>
                    {/* <Button className={styles.btnlog} onClick={() => { router.push('/logIn') }}>Log In</Button> */}
                    <Button className={styles.btnsign} onClick={() => { router.push('/signUp') }}>Sign Up</Button>
                </Grid>
            </Grid>
        </Box>
    );
}


export default Header;