import React from 'react'
import authorImg from '../../images/author.jpeg'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Author = (props) => {
  const {classes, isActive, handleTextClick} = props

  return (
    <Grid
      item
      className={
        isActive ? classes.activeTabContentGridItem : classes.tabContentGridItem
      }
      onClick={() => handleTextClick('Author')}
    >
      <Typography variant="h3" className={classes.tabHeader}>
        Author
      </Typography>
      {isActive && (
        <Grid className={classes.authorRoot} container>
          <Grid container className={classes.authorIntro}>
            <Grid item xs={12} sm={true} className={classes.authorpicItem}>
              <img
                src={authorImg}
                alt="Anders Ward"
                className={classes.authorpic}
                align="left"
              />
            </Grid>
            <Grid item xs={12} sm={true} className={classes.authorbioItem}>
              <Typography variant="body1" className={classes.authorbio}>
                Anders lives in Mountain View, California where he spends his
                days coding, hiking, and of course enjoying the unique culinary
                blend that the Bay Area has to offer. He is a graduate of the UC
                Santa Cruz department of Physics, where he completed research
                for the Santa Cruz Institute for Particle Physics. Having
                studied abroad in France, he loves travel and language, a
                necessary compliment to his current work in web development.
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.resumeContainer}>
            <Accordion square={true} elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h3">Other Projects</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link
                  href="https://github.com/award96/YT_channel_scraper"
                  className={classes.link}
                >
                  <Typography variant="h6">Python Data Scraper</Typography>
                </Link>
              </AccordionDetails>
              <AccordionDetails>
                <ul>
                  <li>
                    <Typography variant="body1">
                      Generated YouTube dataset by building Python web scraper
                      utilizing the YouTube API
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      The
                      <Link
                        href="https://www.kaggle.com/andersward/youtube-video-statistics"
                        className={classes.link}
                      >
                        &nbsp;kaggle dataset&nbsp;
                      </Link>
                      has over 600 views and 40+ downloads.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Data organized by channel. Records statistics on every
                      video for each channel.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Functionality to update data with new videos, as well as
                      append to the bottom of unfinished files.
                    </Typography>
                  </li>
                </ul>
              </AccordionDetails>
              <AccordionDetails>
                <Link
                  href="https://github.com/award96/EM_wave_simulation"
                  className={classes.link}
                >
                  <Typography variant="h6">
                    Python Simulation of Electromagnetic Wave
                  </Typography>
                </Link>
              </AccordionDetails>
              <AccordionDetails>
                <ul>
                  <li>
                    <Typography variant="body1">
                      Algorithm is a linear approximation of Maxwell’s equations
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Simulate any wave with custom initial conditions through
                      command line input
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Creates animation to see results (check README to see
                      example animation from default input)
                    </Typography>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h3">Academics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6">Research</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">
                  Performed research for{' '}
                  <Link href="http://scipp.ucsc.edu/" className={classes.link}>
                    SCIPP
                  </Link>{' '}
                  for 2 years to better understand particle detectors that were
                  damaged from radiation. Wrote an undergraduate thesis on the
                  results and received honors for it.
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <ul>
                  <li>
                    <Typography variant="body1">
                      Determine optimum electronic setup for a damaged particle
                      detector by analyzing its output
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Fit Gaussian and Landau distributions to histogram to
                      determine key values and characterize noise
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Rewrote legacy code to turn a two step data acquisition
                      procedure into one step.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Modelled circuit in electrical engineering software (LT
                      Spice) to predict circuit behaviour
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Synthesized research into undergraduate Thesis and
                      received honors
                    </Typography>
                  </li>
                </ul>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="h6">Education</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">
                  B.S. in Applied Physics from UC Santa Cruz. Graduated 2019
                  with honors.
                  <br />
                  3.60 major GPA, &nbsp;3.56 cumulative GPA.
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <ul>
                  <li>
                    <Typography variant="body1">Minor in Literature</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Dean's Honors 7 times
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Studied abroad in Bordeaux, France
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Tech/Actor in two student films
                    </Typography>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Author
