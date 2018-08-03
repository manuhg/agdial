import Home from 'pages/Home';
import About from 'pages/About';
import Pricing from 'pages/Pricing';
import Join from 'pages/JoinUs';
import Contact from 'pages/Contact';
export const routes = [
  ['/', 'Home', Home],
  ['/about', 'About Us', About],
  ['/pricing', 'Pricing', Pricing],
  ['/joinus', 'Join Us', Join],
  ['/contact', 'Contact Us', Contact],
];
export default routes;
