import './App.css';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Homepage from './Pages/HomePage'
import VotingPage from './Pages/VotingPage';
import CreateVote from './Pages/CreateVote'
import VoteDetails from './Pages/VoteDetails';
//import { Provider } from 'react-redux'
//import { store } from './redux/store'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: 'vote',
      element: <VotingPage />
    },
    {
      path: 'create-vote',
      element: <CreateVote />
    },
    {
      path: 'vote-details/:id',
      element: <VoteDetails />
    }
  ])
  return (
      <RouterProvider router={router}>
        <Homepage />
        <VotingPage/>
        <CreateVote/>
        <VoteDetails/>
      </RouterProvider>
  );
}

export default App;
