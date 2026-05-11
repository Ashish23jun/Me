import { BrowserRouter, Routes, Route, Navigate, type RouterProps } from 'react-router-dom';

const ROUTER_FUTURE: RouterProps['future'] = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import { HomePage } from '@/modules/home';
import { ListeningPage } from '@/modules/listening';
import { ContactPage } from '@/modules/contact';
import { WorkHoloPage } from '@/modules/work-holo';
import { CrelyzorPage } from '@/modules/crelyzor';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={ROUTER_FUTURE}>
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/listening"  element={<ListeningPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="/work-holo"  element={<WorkHoloPage />} />
          <Route path="/crelyzor"   element={<CrelyzorPage />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
