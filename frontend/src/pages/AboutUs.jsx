import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-[#f2f2f2] border-b border-[#e0e0e0] py-2 px-4 text-sm text-[#333]">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/" className="text-[#0052cc] hover:underline">Home</Link>
          <span className="mx-2 text-[#999]">&gt;</span>
          <span className="text-[#666]">About Us</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 flex-1 w-full">
        <h1 className="text-2xl font-bold text-[#333] mb-6">About Us</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Column */}
          <div className="flex-1 text-[#555] text-[14px] leading-[1.6]">
            <p className="mb-6">
              Gone are the days when people used to deal property matters on the basis of "mouth to mouth publicity" or nearby dealers. Globalization and fast lifestyle has encouraged the real estate industry to step in E-World. Now active partakers of real estate world are eagerly seeking the right options to establish themselves in E-Real Estate World. Teralease is a solution to all what bothers to people who all are searching property. As one of the leading property portals, Teralease has tuned itself with pulse of real estate sector. Moving ahead with esteemed registered users and regularly visited by players of real estate industry, Teralease has become the pivot for real-estate sector
            </p>

            <h2 className="text-[#0052cc] text-xl font-bold mb-3">Know us</h2>
            <p className="mb-4">
              We are serving this industry since 1997 by providing an online platform acting as a search engine or advertising agency. With our vast experience in the same field, we have emerged as the solitary solution provider. With such an immense exposure in the said domain, we completely understand the needs of our consumers and strive hard to meet the same.
            </p>
            <p className="mb-4">
              Being substantial in the realm of Real estate, we have stridden a long way in a short span of time. With our resolution to raise high, we beat the all hurdles and stood against all odds. This marvelous achievement has been the upshot of the trust, which our clients have shown over the years
            </p>
            <p className="mb-6">
              Teralease is owned and managed by Teralease Pvt. Ltd, a leading brand in web designing services and e-commerce solutions. Teralease Pvt. Ltd. is counted for its expertise in web solutions and its top ranking business portals. Our invincible expertise and rich experience has raised our spirit to reach ahead from our client's expectation. Commendable success rate of other portals managed by Teralease is a live paradigm of our work excellence.
            </p>

            <h2 className="text-[#0052cc] text-xl font-bold mb-3">Fast Facts</h2>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li><strong>Incepted in</strong> 1997</li>
              <li><strong>Recognized as</strong> Single platform for versatile needs of Real estate World.</li>
              <li><strong>Regularly visited by</strong> All the active partakers of Real estate industry.</li>
              <li><strong>Crowded by</strong> Industrial leaders of real estate world.</li>
              <li><strong>Visitors landing Per day</strong> More than 1, 00,000.</li>
              <li><strong>Services Offered :</strong> Provides Advertising platform to Agents, Buyers and Sellers.</li>
              <li><strong>Prime offer</strong> Free access to buyers/sellers database.</li>
              <li><strong>Coverage</strong> Every nook n corner of India.</li>
              <li><strong>Additionally</strong> Renders comprehensive information about property locations, prime attraction of areas, current trends and much more.</li>
              <li><strong>Supported by</strong> An enthusiastic team of technical coordinators and customer care executives.</li>
              <li><strong>Hot Deals</strong> A versatile range of pocket friendly advertising solutions.</li>
              <li><strong>Solutions available for</strong> Real Estate Agents, Builder & Developer, Contractors, Interior Decorator, Architecture, Consultant & Advisor, Vaastu Consultant, Building Material Dealer etc.</li>
            </ul>

            <h2 className="text-[#0052cc] text-xl font-bold mb-3">Our Forte</h2>
            <p className="mb-4">
              Teralease has gained credence in the online marketplace due to its unique features. Teralease is a well-structured Property Portal, ensures to satiate your thirst for enquiries related to real estate, housing and property in India. Teralease serves as a vital platform for sellers, buyers and brokers where they can easily interchange the information. Apart from this our core specialities are:
            </p>
            <ul className="list-disc pl-5 mb-8 space-y-4">
              <li>
                All-embracing knowledge of selected domain. With in-depth knowledge and extensive experience, we are acquainted with each aspect of real estate and its ever-changing scenario. This assists us in designing solutions according to the specific demands of our esteemed customers.
              </li>
              <li>
                Our pool of experts is the key strength of our functioning. The credit to render par excellence services goes to our highly trained team who work tirelessly to offer end-to-end solution to our valuable customers. Our team members hold full command in respective domain. Apart from this, incomparable dedication of our team, turn every challenge in success. Team of our support executives always remains in mode of action to assist you.
              </li>
              <li>
                Sail through the pool of vast database. With this huge database, our visitors get ease of searching nationwide properties. This databank consist complete details of property dealers, builders, contractors etc., from all over the country
              </li>
              <li>
                User friendly structure of this portal makes it easy to browse. Structure of Teralease facilitates easier and faster navigation. Search by type of property, search by location, search by type of deals etc. are few features that assist visitor to reach to desired page in minimum clicks.
              </li>
              <li>
                Teralease offers wide range of cost effective solutions, exclusively tailored to meet the divergent needs of Real Estate Sector. Our solutions are very flexible and suits to all kinds of budgets
              </li>
            </ul>

            <div className="border border-[#e0e0e0] p-6 italic text-[#555] rounded shadow-sm text-[15px] mb-8">
              Last but not the least, we would like to convey our heartiest thanks to our visitors and registered members as their unfailing trust has enabled us to be India's No.1 property portal. They have been the foundation of our success. Needless to say, that we will put our hundred percent to always assist them in best possible way.
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:w-[320px] flex-shrink-0">
            
            {/* Our Mission */}
            <div className="border border-[#e0e0e0] mb-6 rounded">
              <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] px-4 py-3 font-bold text-[#333]">
                Our Mission
              </div>
              <div className="p-4 text-[13px] text-[#555] leading-[1.6]">
                Our mission is to touch the horizon where our capabilities may successfully meet with the requirements of our clients, that too with ultimate transparency and cost-effectiveness.
              </div>
            </div>

            {/* Vision */}
            <div className="border border-[#e0e0e0] mb-6 rounded">
              <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] px-4 py-3 font-bold text-[#333]">
                Vision
              </div>
              <div className="p-4 text-[13px] text-[#555] leading-[1.6]">
                To sow the seeds of par-excellence services with customer centric approach and reap the trust of worldwide clients.
              </div>
            </div>

            {/* Core Values */}
            <div className="border border-[#e0e0e0] rounded">
              <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] px-4 py-3 font-bold text-[#333]">
                Core Values
              </div>
              <div className="p-4 text-[13px] text-[#555] leading-[1.6]">
                
                <div className="mb-4">
                  <h4 className="font-bold text-[#333] mb-1">Transpicuous Work Culture</h4>
                  <p>Our words and actions always go hand in hand. We strongly preserve transparency to be correct ethically, legally and socially as well.</p>
                </div>
                
                <div className="border-t border-[#e0e0e0] mb-4"></div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-[#333] mb-1">Result-Orientation</h4>
                  <p>By setting clear goals, fixing the priorities, organizing the resources-and rigorously monitoring the growth of project.</p>
                </div>

                <div className="border-t border-[#e0e0e0] mb-4"></div>

                <div className="mb-4">
                  <h4 className="font-bold text-[#333] mb-1">Customer-Centric Approach</h4>
                  <p>We revere the uniqueness of each client and his requirements and budget thus shape out the mirror-like solutions.</p>
                </div>

                <div className="border-t border-[#e0e0e0] mb-4"></div>

                <div>
                  <h4 className="font-bold text-[#333] mb-1">Innovation</h4>
                  <p>
                    Think and do out of the box by setting the minds free. We also seek the unrevealed possibilities, hidden in feedbacks and suggestions of clients and co-workers. We are committed to provide effective advertising solutions in pocket-friendly budgets and grow with the growth of our clients. In fact, zeal to own a home starts right in childhood when we draw the image of home on paper and color it with crayons. However, when we grow we realize it is not a game of paper and crayons rather it needs many efforts, money, adequate guidance, knowledge and much more. Our vision is to be the most trusted platform for property seekers and property dealers that may reduce the hassles usually occurs during searching of properties and property buyers.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
