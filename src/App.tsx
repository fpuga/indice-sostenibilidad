import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MainLayout from './components/common/MainLayout';
import Dashboard from './components/Dashboard';
import CapsList from './components/caps/CapsList';
import CapsForm from './components/caps/CapsForm';
import AssessmentList from './components/assessment/AssessmentList';
import AssessmentForm from './components/assessment/AssessmentForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="caps" element={<CapsList />} />
            <Route path="caps/new" element={<CapsForm />} />
            <Route path="caps/:id" element={<CapsForm />} />
            <Route path="assessments" element={<AssessmentList />} />
            <Route path="assessments/new" element={<AssessmentForm />} />
            <Route path="assessments/:id" element={<AssessmentForm />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
