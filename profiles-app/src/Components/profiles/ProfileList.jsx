import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import '../../Assets/CSS/searchbar.css';
import { Avatar, CardHeader, Divider, Grid } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { User } from '../Information/user';


function ProfileList({SetSelectedLink, link}) {
  useEffect(()=>{
    SetSelectedLink(link);
 }, [])
  return (
  <>
    <Card sx={{p:3}}>
           <Typography variant='h6' component="div">Profile Detials</Typography>
          <Divider sx={{m:2}} color='blue'/>
        <Grid container spacing={2} >
          {User.map(profile =>(
             <Grid item key={profile.id} xs={12} sm={6} md={4}>
             <Card>
              <CardHeader
                avatar={<Avatar alt={profile.Name} src={profile.avatar} sx={{ width: 80, height: 80}} />}
                title={<Typography variant="h5" component="div">
                {profile.Name}
              </Typography>}
              />
               <CardContent>
                 <Typography variant="body2" color="textSecondary">
                   {profile.description}
                 </Typography>
               </CardContent>
               <CardActions>
               <Button variant='contained' color='primary'>More Information</Button>
                  <PlaceIcon color='success' />
                  <FavoriteIcon  color='error' />
               </CardActions>
             </Card>
           </Grid>

          ))}
        </Grid>
    </Card>
  </>
 );
}

export default ProfileList