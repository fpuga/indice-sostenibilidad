import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MainLayout from './components/common/MainLayout';
import Dashboard from './components/Dashboard';
import CapsList from './components/caps/CapsList';
import AssessmentList from './components/assessment/AssessmentList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="caps" element={<CapsList />} />
            <Route path="caps/new" element={<div>Formulario Nuevo CAPS (Próximamente)</div>} />
            <Route path="assessments" element={<AssessmentList />} />
            <Route
              path="assessments/new"
              element={<div>Formulario Nueva Encuesta (Próximamente)</div>}
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
