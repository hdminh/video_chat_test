import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

import Avatar from '@material-ui/core/Avatar';

import ProfileDialog from './profileDialog';
import NotifyDialog from './notifyDialog';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },

  yellow: {
    color: '#fff',
    backgroundColor: '#FFA500',
  },
});

export default function Sidebar(props) {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openNotify, setOpenNotify] = React.useState(false);

  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleClickOpenNotify = () => {
    setOpenNotify(true);
  };

  const location = useLocation();

  return (
    <div className="sidebar-wrapper">
      {/* Button fix */}
      <div className="navbar-tabs__together">
        <div className="btn-function" onClick={handleClickOpenProfile}>
          <Avatar alt="Remy Sharp" src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* Button not fix */}
      <div className="navbar__top">
        <div className={`navbar-item ${location.pathname === "/" ? "nb-active" : ""}`}>
          <Link to="/">
            <FontAwesomeIcon icon="home" size="2x" color={location.pathname === "/" ? "#FFF" : "#858585"} />
          </Link>
        </div>
        <div className={`navbar-item ${location.pathname === "/groups" ? "nb-active" : ""}`}>
          <Link to="/groups">
            <FontAwesomeIcon icon="users" size="2x" color={location.pathname === "/groups" ? "#FFF" : "#858585"} />
          </Link>
        </div>
        <div className={`navbar-item ${location.pathname === "/messages" ? "nb-active" : ""}`}>
          <Link to="/messages">
            <FontAwesomeIcon icon="comment-dots" size="2x"color={location.pathname === "/messages" ? "#FFF" : "#858585"} />
          </Link>
        </div>
        <div className={`navbar-item ${location.pathname === "/restaurants" ? "nb-active" : ""}`}>
          <Link to="/restaurants">
            <FontAwesomeIcon icon="store" size="2x" color={location.pathname === "/restaurants" ? "#FFF" : "#858585"} />
          </Link>
        </div>
      </div>

      {/* Button fix */}
      <div className="navbar__bottom">
        <div className="navbar-item" onClick={handleClickOpenNotify}>
          <Badge color="secondary" badgeContent={0} showZero>
            <FontAwesomeIcon icon="bell" size="2x" color="#858585" />
          </Badge>
        </div>
      </div>

      <ProfileDialog open={openProfile} setOpen={setOpenProfile}/>
      <NotifyDialog open={openNotify} setOpen={setOpenNotify}/>
    </div>
  )
}