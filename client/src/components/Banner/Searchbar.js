import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const Searchbar = (props) => {
  const {
    classes,
    setSearch,
    search,
    display,
    menuId,
    handleClick,
    handleSearchClose,
  } = props

  // will be attached to bottom of Input Base
  let ref = React.useRef(null)
  // are search results displaying
  let isOpen = Boolean(search && display && display.length > 0)

  // instantiate searchMenuItems as empty jsx
  var searchMenuItems = [<div key={0}></div>]
  if (isOpen) {
    // display search results as map of display objects
    searchMenuItems = display.map((recipe) => (
      <MenuItem
        className={classes.searchMenuItem}
        key={recipe.id}
        onClick={() => handleClick(recipe.id)}
      >
        <ListItemAvatar>
          <Avatar
            aria-label="avatar"
            className={classes.avatar}
            alt={recipe.title}
            src={recipe.img}
          />
        </ListItemAvatar>
        <ListItemText primary={recipe.title} />
      </MenuItem>
    ))
  }

  const SearchMenu = () => (
    <ClickAwayListener onClickAway={handleSearchClose}>
      <Popper
        className={classes.searchMenu}
        id={menuId}
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleSearchClose}
        transformorigin={{vertical: -42, horizontal: 0}}
        disablePortal
      >
        <MenuList>{searchMenuItems}</MenuList>
      </Popper>
    </ClickAwayListener>
  )

  return (
    <>
      <InputBase
        placeholder="Search.."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{'aria-label': 'search'}}
        onChange={(e) => setSearch(e.currentTarget.value)}
        value={search}
        ref={ref}
      />
      <SearchMenu />
    </>
  )
}

export default Searchbar
