import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Divider,
    Box,
    Typography
} from '@mui/material';
import {
    Home as HomeIcon,
    Science as ScienceIcon,
    Category as CategoryIcon,
    GridView as GridViewIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const NavMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Antigens', icon: <ScienceIcon />, path: '/antigens' },
        { text: 'Antigen Systems', icon: <CategoryIcon />, path: '/antigen-systems' },
        { text: 'Panel Cells', icon: <GridViewIcon />, path: '/panel-cells' }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: 'background.paper',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    BBTools
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                sx={{ 
                                    color: location.pathname === item.path ? 'primary.main' : 'inherit',
                                    '& .MuiTypography-root': {
                                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NavMenu; 