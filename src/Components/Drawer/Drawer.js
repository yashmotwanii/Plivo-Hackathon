import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event"; // Icon for Reminder
import LayersIcon from "@material-ui/icons/Layers"; // Icon for Bulk
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from 'react-router-dom';
import ReminderPage from "../../Routing/Reminder";

const styles = theme => ({
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none', // Remove underlines
    color: theme.palette.text.primary, // Use the primary text color
  },
});

class DrawerComponent extends React.Component {
  render() {
    const { classes, left, toggleDrawerHandler } = this.props;

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawerHandler}
        onKeyDown={toggleDrawerHandler}
      >
        <List>
          {[
            { text: "Reminder", icon: <EventIcon />, link: '/reminder' },
            { text: "Team Meeting", icon: <LayersIcon />, link: '/bulk' },
          ].map((item, index) => (
            <React.Fragment key={item.text}>
              <Link to={item.link} className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
              {index % 1 === 0 && index < 2 && <Divider />} {/* Add Divider except for the last item */}
            </React.Fragment>
          ))}
        </List>
      </div>
    );

    return (
      <Drawer open={left} onClose={toggleDrawerHandler}>
        {sideList("left")}
      </Drawer>
    );
  }
}

export default withStyles(styles)(DrawerComponent);
