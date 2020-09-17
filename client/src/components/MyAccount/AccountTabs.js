import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SettingsIcon from '@material-ui/icons/Settings'
import FavoriteIcon from '@material-ui/icons/Favorite'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

const AccountTabs = (props) => {
  const {classes, activeTab, handleChange} = props

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<SettingsIcon />} label="SETTINGS" />
        <Tab icon={<FavoriteIcon />} label="FAVORITES" />
        <Tab icon={<AssignmentIndIcon />} label="FOLLOWING" />
        <Tab icon={<GroupIcon />} label="FOLLOWERS" />
      </Tabs>
    </Paper>
  )
}

export default AccountTabs
