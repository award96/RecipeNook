import React from 'react'
import Link from '@material-ui/core/Link'
import reactImg from '../../images/reactLogo.jpg'
import materialImg from '../../images/materialUILogo.png'
import nodeImg from '../../images/nodeJSLogo.png'
import expressImg from '../../images/ExpressJSLogo.png'
import mysqlImg from '../../images/mySQLlogo.png'
import herokuImg from '../../images/herokuLogo.png'
import dataModel from '../../images/MySQLmodel.png'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Code = (props) => {
  const {classes, isActive, handleTextClick} = props

  return (
    <Grid
      item
      className={
        isActive ? classes.activeTabContentGridItem : classes.tabContentGridItem
      }
      onClick={() => handleTextClick('Code')}
    >
      <div className={classes.codeRoot}>
        <Typography variant="h3" className={classes.tabHeader}>
          Code
        </Typography>
        {isActive && (
          <>
            <Grid container className={classes.codeHeader}>
              <Link className={classes.link} href="https://github.com/award96/RecipeNook">
                <Typography variant="h4">Check it out on GitHub</Typography>
              </Link>
            </Grid>
            <Accordion square elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Grid container className={classes.accordionTitleContainer}>
                  <Typography variant="h3">Web App Overview</Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6">
                  {'React & Material UI frontend'}
                  <br />
                  {'Express Server backend'}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">
                  I created this fully functional website to become a better
                  developer and to have something to show for that growth. I
                  hope you enjoy the site, and the recipes on it, as much as I
                  enjoyed making it.
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="h6">Centered around Users...</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">Users can:</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <ul>
                  <li>
                    <Typography variant="body1">
                      make and edit a recipe
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      post and edit a review
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">follow one another</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">favorite a recipe</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      recieve a notification
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      change their username
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      add and change an avatar picture
                    </Typography>
                  </li>
                </ul>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">
                  I think it is necessary to explain Notifications a bit,
                  because unlike recipes, comments, and users, you won't see any
                  when you first come to the site.
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="h6">
                  Notifications are created when
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <ul>
                  <li>
                    <Typography variant="body1">
                      A user you follow posts a recipe
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">A user follows you</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      A user posts a review on your recipe
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      A user favorites your recipe
                    </Typography>
                  </li>
                </ul>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">
                  Notifications are NOT created when those recipes or comments
                  are edited, nor when a user unfollows you.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion square elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container className={classes.accordionTitleContainer}>
                  <Typography variant="h3">Stack</Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container className={classes.codeContainer}>
                  <Grid item xs={12} md={6}>
                    <img
                      className={classes.reactImg}
                      src={reactImg}
                      alt="React"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      I love using React. JSX is an amazing concept that makes
                      reusability intuitive. The state and context management
                      baked into React makes it quick to build a responsive
                      webpage, and the community makes it easy whenever you run
                      into trouble. Not to mention, it's fast. I've hardly had
                      to optimize anything on this web app simply because there
                      isn't lag.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
              <AccordionDetails>
                <Grid container className={classes.codeContainer}>
                  <Grid item xs={12} md={6}>
                    <img
                      className={classes.materialImg}
                      src={materialImg}
                      alt="material UI"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      Material UI helped me get off the ground quick with my
                      design. Their components are designed to be customizable,
                      but I rarely did more than recolor, resize, and change the
                      margins, because they're so good looking right out of the
                      box. In the future I definitely would rely on them less
                      than I have here, but for something like the Accordion
                      component, it's a no brainer. Just drag and drop and then
                      focus on customizing the look, rather than spending time
                      putting together the state logic and transitions.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
              <AccordionDetails>
                <Grid container className={classes.codeContainer}>
                  <Grid item xs={12} md={6}>
                    <img
                      className={classes.nodeImg}
                      src={nodeImg}
                      alt="nodeJS"
                    />
                    <img
                      className={classes.expressImg}
                      src={expressImg}
                      alt="expressJS"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      A Node server made the most sense for this project because
                      it was never intended to compete with the litany of other
                      recipe websites. Rather, it is a project to develop and
                      demonstrate my skills as a software engineer and full
                      stack web developer. The single threaded nature of the
                      server will therefore most likely never result in
                      performance issues, as it is unlikely to recieve high
                      request volume or have to process large amounts of data.
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;Express is one of, if not the most
                      popular Node framework, and is extremely helpful in fast
                      development. It was such a breeze to learn, I was able to
                      get the basics of my server up and running in no time.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
              <AccordionDetails>
                <Grid container className={classes.codeContainer}>
                  <Grid item xs={12} md={6}>
                    <img
                      className={classes.mysqlImg}
                      src={mysqlImg}
                      alt="mySQL"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      A relational database made the most sense here because
                      the recipe and user data have clearly defined relationships
                      that require integrity. The format of the data is also very
                      consistent.
                      <br/>
                      The choice of MySQL over other options was largely arbitray, though
                      it should be said its popularity was a large part of that choice.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
              <AccordionDetails>
                <Grid container className={classes.codeContainer}>
                  <Grid item xs={12} md={6}>
                    <img
                      className={classes.herokuImg}
                      src={herokuImg}
                      alt="heroku"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      Heroku has been quick to set up and easy to work with.
                      They also offer an affordable $7/month option for project
                      websites, which was perfect for me.
                      <br/>
                      The GitHub integration is amazing. I have it set to push
                      to my development server, which allows for a great workflow.
                      Just push, test, and deploy.
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion square elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Grid container className={classes.accordionTitleContainer}>
                  <Typography variant="h3">MySQL Data Model</Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <img src={dataModel} alt="MySQL data model" />
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </div>
    </Grid>
  )
}

export default Code
