// About page component
import { useSEO } from '../utils/seo';

export default function About() {
  // Apply SEO for about page
  useSEO('about');
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about Deewan Residency</p>
    </div>
  );
}