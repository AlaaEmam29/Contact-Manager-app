import {
  Typography,
  Container,
  Grid,
  Divider,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Work, Terminal } from '@mui/icons-material'

const AboutPage = () => {
  return (
    <Container maxWidth='md'>
      <Box textAlign='center' my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Hello! I'm Alaa Emam 👋
        </Typography>
        <Typography variant='h6' color='textSecondary'>
          Your Next Frontend Developer Hire
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant='h4' gutterBottom>
        Summary
      </Typography>
      <Typography variant='subtitle1' paragraph>
        Frontend Engineer with 3 years of experience specializing in JavaScript, React, and Vue.
        Strong ownership mindset, proficient in frontend technologies, and passionate about learning
        and adapting to new technologies. Excellent communication and collaboration skills.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant='h4' gutterBottom>
        Professional Experience
      </Typography>

      <Box my={2}>
        <Typography variant='h6' gutterBottom>
          <Work fontSize='small' /> Frontend Developer at RDI
        </Typography>
        <Typography variant='subtitle1' paragraph>
          RDI, also known as The Engineering Company for the Development of Digital Systems,
          specializes in OCR, NLP, and speech technologies. I led the frontend development of
          AI-driven tools that boosted user engagement by 40% and enhanced accessibility by 50%.
        </Typography>
        <Typography variant='subtitle1'>Key achievements:</Typography>
        <List>
          <ListItem>
            <ListItemText primary='Increased development speed by 30% using React and TypeScript.' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Optimized performance and reduced loading times by 35%, enhancing customer satisfaction by 25%.' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Contributed to AI-driven NLP and OCR applications, improving customer interactions by 45%.' />
          </ListItem>
        </List>
      </Box>

      <Box my={2}>
        <Typography variant='h6' gutterBottom>
          <Work fontSize='small' /> Frontend Developer (Freelance)
        </Typography>
        <Typography variant='subtitle1' paragraph>
          Developed multiple projects using React and Vue, including a job platform, interactive
          calendars, and SaaS solutions for clients in diverse industries.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Terminal />
            </ListItemIcon>
            <ListItemText
              primary='Jobrex'
              secondary='An AI job platform built with React, Bootstrap, React Query, Zustand.'
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Terminal />
            </ListItemIcon>
            <ListItemText
              primary='Interactive Calendar for NCPD'
              secondary='Built using Vue 3, Tailwind CSS, Pinia, and PrimeVue.'
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant='h4' gutterBottom>
        Projects
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Terminal />
          </ListItemIcon>
          <ListItemText
            primary='CSX | Contact Center Analytics'
            secondary='A system to analyze recorded customer calls, enhancing call analytics and customer interactions.'
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Terminal />
          </ListItemIcon>
          <ListItemText
            primary='Kateb | Speech-to-Text Application'
            secondary={`Developed a comprehensive speech-to-text application with both website and portal versions. The application 
          processes audio and video files to provide accurate transcriptions.`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Terminal />
          </ListItemIcon>
          <ListItemText
            primary='Sotoor'
            secondary='OCR software for converting scanned documents into searchable files.'
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant='h4' gutterBottom>
        Technical Skills
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1'>
            <strong>Languages</strong>
          </Typography>
          <Typography variant='subtitle1'>
            JavaScript (ES6+), TypeScript, HTML, CSS, Python
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1'>
            <strong>Frameworks & Libraries</strong>
          </Typography>
          <Typography variant='subtitle1'>
            React, Vue, Bootstrap, Tailwind CSS, React Query, Zustand, Pinia
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1'>
            <strong>Testing Libraries</strong>
          </Typography>
          <Typography variant='subtitle1'>Vitest, Jest, React Testing Library, MSW</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1'>
            <strong>Tools</strong>
          </Typography>
          <Typography variant='subtitle1'>Git, GitHub, GitLab, Visual Studio Terminal</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutPage
