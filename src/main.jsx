import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import App from './App';
import './styles/global.scss';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import { StrictMode } from 'react';
import Service from './pages/Services/Service/Service';
import Services from './pages/Services/Services';
import AiIntelligence from './pages/Services/AiIntelligence/AiIntelligence';
import SmartSecurity from './pages/Services/SmartSecurity/SmartSecurity';
import EnterpriseErp from './pages/Services/EnterpriseErp/EnterpriseErp';
import ProductApplication from './pages/Services/ProductApplication/ProductApplication';
import DigitalTransformation from './pages/Services/DigitalTransformation/DigitalTransformation';
import TechnologyTalent from './pages/Services/TechnologyTalent/TechnologyTalent';
import Products from './pages/Products/Products';
import Work from './pages/Work/Work';
import Contact from './pages/Contact/Contact';
import CaseStudy from './pages/CaseStudy/CaseStudy';
import ProductDetail from './pages/ProductDetails/ProductDetails';
import NotFound from './pages/NotFound/NotFound';
import ComingSoon from './pages/ComingSoon/ComingSoon';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='service' element={<Service />} />
      <Route path='service' element={<Services />}>
        <Route path='ai-intelligence' element={<AiIntelligence />} />
        <Route path='smart-security' element={<SmartSecurity />} />
        <Route path='enterprise-erp' element={<EnterpriseErp />} />
        <Route path='product-application' element={<ProductApplication />} />
        <Route path='digital-transformation' element={<DigitalTransformation />} />
        <Route path='technology-talent' element={<TechnologyTalent />} />
      </Route>
      <Route path='products' element={<Products />} />
      <Route path='products/:slug' element={<ProductDetail />} />
      <Route path='work' element={<Work />} />
      <Route path='contact' element={<Contact />} />
      <Route path='case-study/:slug' element={<CaseStudy />} />
      <Route path='privacy-policy' element={<ComingSoon type="privacy" />} />
      <Route path='terms-and-conditions' element={<ComingSoon type="terms" />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);