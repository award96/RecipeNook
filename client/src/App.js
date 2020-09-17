import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/core/styles'
import './App.css'
import {Banner, Footer} from './components/index'
import {
  RecipeCards,
  Recipe,
  Login,
  About,
  CreateAccount,
  UserProfile,
  MyAccount,
  CreateRecipe,
} from './pages/index'
import theme from './theme'

function App() {
  // recipe data state
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  // fetch recipe data
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('/api/recipes/get')
      let respData = await response.json()
      setData(respData)
      setIsLoaded(true)
    }

    if (!isLoaded) fetchData()
  }, [isLoaded])

  const reloadData = () => {
    setIsLoaded(false)
  }

  /*
    Banner
    -- current route ---
    :: Recipe Cards (homepage)
    :: Recipe (detail page)
    :: Login
    :: About
    :: Create Account
    :: User Profile (public)
    :: My Account (private)
    :: Create Recipe
    -- ------- ----- ---
    Footer
  */

  const routes = {
    RECIPE_CARDS: '/',
    RECIPE: '/recipes/recipe-id=:recipeId',
    LOGIN: '/login',
    ABOUT: '/about',
    CREATE_ACCOUNT: '/create-account',
    USER_PROFILE: '/user-profile/username=:username',
    MY_ACCOUNT: '/my-account',
    CREATE_RECIPE: '/create-recipe',
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Banner routes={routes} />
        <Switch>
          {/* Home Page */}
          <Route exact path={routes.RECIPE_CARDS}>
            <RecipeCards data={data} isLoaded={isLoaded} routes={routes} />
          </Route>
          {/* Detail Page */}
          <Route path={routes.RECIPE}>
            <Recipe data={data} isLoaded={isLoaded} routes={routes} />
          </Route>
          {/* Login Page */}
          <Route path={routes.LOGIN}>
            <Login routes={routes} />
          </Route>
          {/* About Page */}
          <Route path={routes.ABOUT}>
            <About />
          </Route>
          {/* Create Account Page */}
          <Route path={routes.CREATE_ACCOUNT}>
            <CreateAccount routes={routes} />
          </Route>
          {/* User Profile Page */}
          <Route path={routes.USER_PROFILE}>
            <UserProfile data={data} isLoaded={isLoaded} routes={routes} />
          </Route>
          {/* myAccount page */}
          <Route path={routes.MY_ACCOUNT}>
            <MyAccount
              data={data}
              isLoaded={isLoaded}
              routes={routes}
              reloadData={reloadData}
            />
          </Route>
          {/* Create Recipe Page */}
          <Route path={routes.CREATE_RECIPE}>
            <CreateRecipe routes={routes} reloadData={reloadData} />
          </Route>
        </Switch>
        <Footer routes={routes} />
      </div>
    </ThemeProvider>
  )
}

export default App
