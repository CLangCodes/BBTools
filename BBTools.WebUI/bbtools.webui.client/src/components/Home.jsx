import React from 'react';
import { Container, Typography, Button, Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@mui/material';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg,rgb(12, 48, 77) 30%,rgb(14, 76, 90) 90%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const Home = () => {
  return (
    <Box>
      <HeroSection >
        <Container maxWidth="md">
          <h1>Welcome to BBTools</h1>
          
          <FeatureCard elevation={3}>
            <p>Select a tool from the navigation menu to get started.</p>
          </FeatureCard>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Antigen Systems
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage blood group antigen systems
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/antigen-systems">
                  View Systems
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Antigens
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage individual blood group antigens
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/antigens">
                  View Antigens
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Panel Cells
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage panel cells for antibody identification
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/panel-cells">
                  View Panel Cells
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Antigen Calculator
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calculate antigen frequencies and screening units
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/calculator">
                  Open Calculator
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Powerful Tools
              </Typography>
              <Typography>
                Access a comprehensive suite of development tools designed to streamline your workflow.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Easy Integration
              </Typography>
              <Typography>
                Seamlessly integrate with your existing development environment and tools.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Real-time Updates
              </Typography>
              <Typography>
                Stay up-to-date with the latest features and improvements.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container> */}

      {/* Call to Action */}
      {/* <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Join thousands of developers who are already using BBTools to enhance their productivity.
          </Typography>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box> */}
    </Box>
  );
};

export default Home;
