import { useTheme } from "@emotion/react";
import { Grid, Button, List, ListItemButton, Typography } from "@mui/material";
import { BannerContainer, BannerContent, BannerDescription, } from "../../../styles/banner";
import { Colors } from "../../../styles/theme";
import { MenuTitle, TutorialAlert, TutorialTypes } from "../../../styles/tutorialMenu";

export default function TutorialMenu() {
    const theme = useTheme();
    return (
        <>
            <BannerContainer sx={{ maxWidth: '100%' }}>
                <BannerContent sx={{ maxWidth: '100%', width: '100%' }}>
                    <MenuTitle align="center"> Tutorials
                    </MenuTitle>
                    {/* <TutorialAlert align="center" >
                        You must Log in first !
                    </TutorialAlert> */}
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item md={6} lg={3}>
                            <TutorialTypes>
                                Programming
                            </TutorialTypes>
                            <List>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        Java
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        Python
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        C#
                                    </Typography>
                                </ListItemButton>

                            </List>
                        </Grid>
                        <Grid item md={6} lg={3}>
                            <TutorialTypes>
                                HTML/CSS
                            </TutorialTypes>

                            <List>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        HTML
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        CSS
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        Bootstrap
                                    </Typography>
                                </ListItemButton>

                            </List>

                        </Grid>
                        <Grid item md={6} lg={3}>
                            <TutorialTypes>
                                Javascript
                            </TutorialTypes>

                            <List>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        React
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        Angular JS
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        JavaScript
                                    </Typography>
                                </ListItemButton>

                            </List>

                        </Grid>
                        <Grid item md={6} lg={3}>
                            <TutorialTypes>
                                Server Side
                            </TutorialTypes>

                            <List>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        MYSQL
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        PHP
                                    </Typography>
                                </ListItemButton>

                                <ListItemButton>
                                    <Typography lineHeight={2} variant="caption">
                                        MongoDB
                                    </Typography>
                                </ListItemButton>

                            </List>

                        </Grid>
                    </Grid>
                </BannerContent>
            </BannerContainer>
        </>


    );
}