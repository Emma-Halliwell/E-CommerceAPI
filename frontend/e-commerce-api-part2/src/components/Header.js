import React, { useRef, useState, useEffect } from 'react';
import companyLogo from './SportsGaloreLogo.jpeg';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function Header () {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            setOpen(false);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div className='header'>
                <img src={companyLogo} alt="Sports Galore Logo" width="100px" height="100px"/>
                <NavLink to="/" className="link">Home</NavLink>
                <NavLink to="products" className="link">Products</NavLink>
                <div>
                    <Button
                        ref={anchorRef}
                        id="compostion-button"
                        aria-controls={open ? 'compostion-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <FiMenu id="menu" />
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id='composition-menu'
                                            aria-labelledby='compostion-button'
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}><NavLink to="register" className="hidden-link">Register</NavLink></MenuItem>
                                            <MenuItem onClick={handleClose}><NavLink to='login' className="hidden-link">Sign In</NavLink></MenuItem>
                                            <MenuItem onClick={handleClose}><NavLink to="profile" className="hidden-link">Profile</NavLink></MenuItem>
                                            <MenuItem onClick={handleClose}><NavLink to="logout" className="hidden-link">LogOut</NavLink></MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </Stack>
    //     <div className='header'>
    //         <img src={companyLogo} alt="Sports Galore Logo" width="100px" height="100px"/>
    //         <NavLink to="/" className="link">Home</NavLink>
    //         <NavLink to="products" className="link">Products</NavLink>
    //     </div>
    )
}