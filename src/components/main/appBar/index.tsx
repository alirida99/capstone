import { ListItemIcon, ListItemButton } from "@mui/material";
import { AppbarContainer, MyList } from "../../../styles/appBar";
import SearchIcon from "@mui/icons-material/Search"
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import ContactIcon from "@mui/icons-material/ContactMail";
import AdminIcon from "@mui/icons-material/VerifiedUser";
import UserIcon from "@mui/icons-material/Login";
import { BannerContainer, BannerContent, BannerTitle } from "../../../styles/banner";
import { useTheme } from "@mui/material/styles";
import QuizIcon from '@mui/icons-material/Quiz';
import Image from "next/image";
import { useState } from "react";


/*function Tutorial(){
    const theme = useTheme ();

    return (
       
       <BannerContainer>
        <BannerContent>
        <BannerTitle>
                Learn Coding
                
            Hello World !!!
            Hello World !!!
            
            </BannerTitle>
        </BannerContent>
       </BannerContainer>

    );

}
 */

interface OptionsProps {
    isTutorials: boolean;
    isExercises: boolean;
}

export default function AppBar({ isTutorials, isExercises }: OptionsProps) {
    const [tutorialsShow, setTutorialsShow] = useState(false);

    return (
        <AppbarContainer>
            {/* < img style={{ width: 200, height: 60 }} src="/images/eboardlogo.jpg" /> */}
            <Image src='/images/eboardlogo.jpg' width={200} height={60} alt="logo" />

            <MyList type="row">

                {/* <ListItemButton onClick={() => (alert('You must Login'))} >
                    <ListItemIcon>
                        <SearchIcon />
                        <label >Search</label>
                    </ListItemIcon>
                </ListItemButton> */}

                <ListItemButton > <ListItemIcon><HomeIcon /></ListItemIcon>Home </ListItemButton>
                <ListItemButton onClick={() => setTutorialsShow(!tutorialsShow)}> <ListItemIcon><BookIcon /></ListItemIcon>Tutorials </ListItemButton>
                <ListItemButton> <ListItemIcon ><QuizIcon /></ListItemIcon>Exercises </ListItemButton>
                <ListItemButton > <ListItemIcon><AdminIcon /></ListItemIcon>Admin </ListItemButton>
                <ListItemButton href="/logIn"> <ListItemIcon><UserIcon /></ListItemIcon>User </ListItemButton>
            </MyList>

        </AppbarContainer>
    );

}