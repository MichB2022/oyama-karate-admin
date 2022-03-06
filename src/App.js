import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MasterTemplate from './templates/MasterTemplate/MasterTemplate';
import Articles from './pages/Articles/Articles';
import NewArticle from './pages/NewArticle/NewArticle';

function App() {
  return (
    <Router>
      <MasterTemplate>
        <Routes>
          {/* ARTICLES */}
          <Route path='/admin' element={<Articles />} />
          <Route path='/admin/aktualnosci' element={<Articles />} />
          <Route path='/admin/aktualnosci/nowy' element={<NewArticle />} />
          <Route path='/admin/aktualnosci/nowy/:id' element={<NewArticle />} />

          {/* <Route path='/admin/sekcje' element={<Sections />} />
          <Route path='/admin/sekcje/dodaj' element={<NewSection />} />
          <Route path='/admin/sekcje/dodaj/:id' element={<NewSection />} />
          
          <Route path='/admin/przedszkolaki' element={<Preschoolers />} />
          <Route path='/admin/kalendarz' element={<Calendar />} />
          <Route path='/admin/strony-informacyjne' element={<InfoPages />} />
          <Route
            path='/admin/strony-informacyjne/dodaj'
            element={<NewInfoPage />}
          />
          <Route
            path='/admin/strony-informacyjne/dodaj/:id'
            element={<NewInfoPage />}
          />
          <Route
            path='/admin/kalendarz/nowe-wydarzenie'
            element={<NewEvent />}
          />
          <Route
            path='/admin/kalendarz/nowe-wydarzenie/:id'
            element={<NewEvent />}
          />
          <Route path='/admin/harmonogram' element={<Schedule />} />
          <Route path='/admin/harmonogram/dodaj' element={<NewGroup />} />
          <Route
            path='/admin/harmonogram/dodaj/:groupId'
            element={<NewGroup />}
          />
          <Route
            path='/admin/harmonogram/dodaj/wiersz/:groupId'
            element={<NewScheduleRow isNewRow={true} />}
          />
          <Route
            path='/admin/harmonogram/dodaj/wiersz/:groupId/:id'
            element={<NewScheduleRow />}
          />
          <Route
            path='/admin/instruktorzy-i-pomocnicy'
            element={<InstructorsAndHelpers />}
          />
          <Route
            path='/admin/instruktorzy-i-pomocnicy/dodaj'
            element={<NewPerson />}
          />
          <Route
            path='/admin/instruktorzy-i-pomocnicy/dodaj/:id'
            element={<NewPerson />}
          /> */}
        </Routes>
        {/* <NewSection /> */}
      </MasterTemplate>
    </Router>
  );
}

export default App;
