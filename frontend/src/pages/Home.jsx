import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InfoCards from '../components/InfoCards';
import DiscoverProperties from '../components/DiscoverProperties';
import RealEstateServices from '../components/RealEstateServices';
import PopularLocalities from '../components/PopularLocalities';
import FeaturedProperties from '../components/FeaturedProperties';
import TopAgents from '../components/TopAgents';
import InsightsTools from '../components/InsightsTools';
import MostViewedProperties from '../components/MostViewedProperties';
import LatestProperties from '../components/LatestProperties';
import RealEstateBlogs from '../components/RealEstateBlogs';
import MarketOverview from '../components/MarketOverview';
import TestimonialsSection from '../components/TestimonialsSection';

import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <InfoCards />
      <DiscoverProperties />
      <RealEstateServices />
      {/* <PopularLocalities /> */}
      <FeaturedProperties />
      <TopAgents />
      <InsightsTools />
      <MostViewedProperties />
      <LatestProperties />
      <TestimonialsSection />
      <RealEstateBlogs />
      <MarketOverview />
      <Footer />
    </div>
  );
}
