import * as React from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { getTheaterSystemInfo, getTheaterInfo, getShowtimeInfo } from "../../apis/cinemaAPI";
import { useQuery } from '@tanstack/react-query';
import { Grid, Stack } from '@mui/material';
import github from "../../assets/img/github.png"
import MUI from "../../assets/img/MUI.png"
import react from "../../assets/img/react.png"
import slick from "../../assets/img/slick.png"
import tanstackquery from "../../assets/img/tanstackquery.png"
import HTML from "../../assets/img/HTML.png"
import JS from "../../assets/img/JS.png"


const Footer = () => {

  const stackSettings = {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  }

  const typographySettings = {
    // gutterbottom: true,
    variant: "h6",
    // marginBottom: 2,
    style: {
      fontSize: 20,
      fontWeight: 700,
    }
  }

  const iconButtonSettings = {
    style: {
      fontSize: 50,
    }
  }

  const { data: theaterSystemData, isLoading: isLoadingTheaterSysytem } = useQuery({
    queryKey: ["TheaterSystemInfo"],
    // queryFn ko truyền vào tham số thì gọi thế này(nếu có truyền tham số thì phải gọi bằng 1 callback)
    queryFn: getTheaterSystemInfo,
  });
  const theaterSystem = theaterSystemData || [];

  const [color, setColor] = React.useState('neutral');
  return (
    <Sheet
      // variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== 'neutral' && {
          bgcolor: `${color}.800`,
        }),
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: 'sm' },
      }}
      >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
        >
          <ColorLensRoundedIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton >
          <GitHubIcon />
        </IconButton>
        <IconButton >
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton >
          <InstagramIcon />
        </IconButton>
        <IconButton >
          <TwitterIcon />
        </IconButton>
        <IconButton >
          <YouTubeIcon />
        </IconButton>
        <IconButton >
          <LinkedInIcon />
        </IconButton>
        <Input
          variant="soft"
          placeholder="Type in your email"
          type="email"
          name="email"
          endDecorator={
            <IconButton variant="soft" aria-label="subscribe">
              <SendIcon />
            </IconButton>
          }
          sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: 'initial' } }}
          >
            <IconButton>
              <img alt="" src={theaterSystem[5]?.logo} />
            </IconButton>
          </AspectRatio>
          <CardContent>
            <Typography level="body-sm">Về chúng tôi</Typography>
          </CardContent>
        </Card>
        <Stack>
          <Stack {...stackSettings}>
            <Typography {...typographySettings}>Đối tác </Typography>
            {theaterSystem.map((item) => {
              return (
                <IconButton
                  key={item.maHeThongRap}
                  divider={<Divider orientation="vertical" flexItem />}>
                  <>
                    <img src={item.logo} style={{ width: 50 }} />
                  </>
                </IconButton>
              );
            })}
          </Stack>
          <Stack {...stackSettings} style={{ marginTop: 10 }}>
            <Typography {...typographySettings}>Tài trợ </Typography>
            <IconButton {...iconButtonSettings}>
              {/* <i class="fab fa-github"></i> */}
              <img src={github} alt="" style={{ width: 50, display: "inline-block", borderRadius: "50%" }} />
            </IconButton>
            <IconButton {...iconButtonSettings}>
              <img src={HTML} alt="" style={{ width: 50, display: "inline-block", borderRadius: "50%" }} />
              {/* <i class="fab fa-react"></i> */}
            </IconButton>
            <IconButton {...iconButtonSettings}>
              <img src={JS} alt="" style={{ width: 50, display: "inline-block", borderRadius: "50%" }} />
              {/* <i class="fab fa-java"></i> */}
            </IconButton>
            <IconButton {...iconButtonSettings}>
              <img src={MUI} alt="" style={{ width: 50, display: "inline-block", borderRadius: "50%" }} />
              {/* <i class="fab fa-html5"></i> */}
            </IconButton>
            <IconButton {...iconButtonSettings}>
              <img src={react} alt="" style={{ width: 50, display: "inline-block", borderRadius: "50%" }} />
              {/* <i class="fab fa-css3"></i> */}
            </IconButton>
            <IconButton {...iconButtonSettings}>
              <img src={slick} alt="" style={{ width: 50, display: "inline-block", borderRadius: "50%" }} />
              {/* <i class="fab fa-chrome"></i> */}
            </IconButton>
          </Stack>
        </Stack>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, '--ListItem-radius': '8px', '--ListItem-gap': '0px' }}
        >
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }} {...typographySettings}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>About</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }} {...typographySettings}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Products</ListSubheader>
            <List sx={{ '--ListItemDecorator-size': '32px' }}>
              <ListItem>
                <ListItemButton>Joy UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Base UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Material UI</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}

export default Footer