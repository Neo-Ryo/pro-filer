/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { lazy } from 'solid-js'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

import { UserContextProvider } from './context/userContext'

import './index.css'
import Login from './pages/login/Login'
const Signin = lazy(() => import('./pages/signin/Signin'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))

const queryClient = new QueryClient()
const root = document.getElementById('root')
render(
    () => (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <Router>
                    <Route path="/" component={Login} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/dashboard/:userUuid" component={Dashboard} />
                </Router>
            </UserContextProvider>
        </QueryClientProvider>
    ),
    root!
)
