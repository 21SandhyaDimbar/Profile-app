import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "../../Assets/CSS/searchbar.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { User } from "../Information/user";
import MapComponent from "../Map/MapComponent";

function ProfileList({ SetSelectedLink, link }) {
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SetSelectedLink(link);
  }, []);

  const handleProfileClick = (id) => {
    setLoading(true);
    setSelectedProfileId(id);

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleClose = () => {
    setSelectedProfileId(null);
  };

  const selectedProfile = User.find(
    (profile) => profile.id === selectedProfileId
  );

  return (
    <>
      <Typography variant="h6" component="div" sx={{ color: "#0C359E" }}>
        Profile Details
      </Typography>
      <Divider color="blue" sx={{ m: 2 }} />
      <Grid container spacing={2}>
        {User.map((profile) => (
          <Grid item key={profile.id} xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    alt={profile.Name}
                    src={profile.avatar}
                    sx={{ width: 80, height: 80 }}
                  />
                }
                title={
                  <Typography variant="h5" component="div">
                    {profile.Name}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {profile.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleProfileClick(profile.id)}
                >
                  More Information
                </Button>
                <PlaceIcon color="success" />
                <FavoriteIcon color="error" />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={selectedProfileId !== null} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ color: "#FF407D" }}>
            Profile Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedProfile && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Avatar
                    alt={selectedProfile.Name}
                    src={selectedProfile.avatar}
                    sx={{ width: 120, height: 120, margin: "auto" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" align="center">
                    {selectedProfile.Name}
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid xs={6}>
                    <hr />
                    <Typography variant="body2" component="div" align="center">
                      Contact
                    </Typography>
                    <hr />
                    <Typography variant="body2" component="div" align="center">
                      Email ID
                    </Typography>
                    <hr />
                    <Typography variant="body2" component="div" align="center">
                      Interests
                    </Typography>
                    <hr />
                    <Typography variant="body2" component="div" align="center">
                      Location
                    </Typography>
                    <hr />
                    <Typography variant="body2" component="div" align="center">
                      Description
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <hr />
                    <Typography variant="body2">
                      {selectedProfile.contat}
                    </Typography>
                    <hr />
                    <Typography variant="body2">
                      {selectedProfile.email}
                    </Typography>
                    <hr />
                    <Typography variant="body2">
                      {selectedProfile.interests}
                    </Typography>
                    <hr />
                    <Typography variant="body2">
                      {selectedProfile.location}
                    </Typography>
                    <hr />
                    <Typography variant="body2">
                      {selectedProfile.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <MapComponent profile={selectedProfile} />
            </>
          )}

          {loading && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <CircularProgress />
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProfileList;
