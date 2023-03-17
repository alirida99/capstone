import { Grid, ListItemButton, Typography, ListItemIcon } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import Link from "next/link";
import { BannerContainer, BannerContent, BannerTitle, BannerDescription, BannerImage } from "../../../styles/banner";
import styles from './banner.module.scss'

export default function Banner() {
    const theme = useTheme();

    return (
        <Box>
            <Grid sx={{ width: '100%' }}>
                <BannerContainer>
                    <BannerImage src="/images/homee1.png" />
                    <BannerContent>
                        <Typography variant="h6"> Not sure where to begin?
                            {/* <a href="/signUp">Sign Up</a> and */}
                            <span className={styles.link}>
                                <Link href="/signUp"> Sign Up </Link>
                            </span>
                            and
                            {/* <ListItemButton href="/signUp" sx={{ color: 'blue' }}>
                                <ListItemIcon>
                                </ListItemIcon>Sign Up
                            </ListItemButton>
                            and */}
                        </Typography>
                        <BannerTitle>
                            Learn Coding
                        </BannerTitle>
                        <BannerDescription >
                            Everyone’s talking about coding, but where do you start? This path will give you an introduction to the world of code and programming fundamentals that can be helpful for any language you learn..

                        </BannerDescription>
                    </BannerContent>
                </BannerContainer>
            </Grid>
        </Box >
    );
}