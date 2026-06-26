import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const blogsData = [
  {
    title: 'Delhi NCR Commercial Properties Under 5 Cr: Best Areas & Buying Guide',
    author: 'Teralease Insights',
    category: 'Commercial Real Estate',
    date: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
    excerpt: 'The commercial real estate prices in Delhi NCR are known to be skyrocketing, and although it is...',
    content: `The commercial real estate prices in Delhi NCR are known to be skyrocketing, and although it is a high-demand market, you can still find properties under 5 Cr if you look closely.
    
    ## Detailed Market Study
    This is the first step to help you lease your warehouse easily. Understand the present market lease rate of properties that are in and around your neighbourhood.
    
    ## Physical Condition of the Warehouse
    This is another important aspect of leasing your property at a good price. If the warehouse is in fine condition it will attract the attention of many potential businesses.`,
    tags: ['Commercial', 'Delhi NCR', 'Investment']
  },
  {
    title: 'Tips to Lease your Warehouse in Delhi NCR in No Time',
    author: 'Teralease Insights',
    category: 'Property for Lease',
    date: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?w=1200&h=600&fit=crop',
    excerpt: 'Delhi NCR is rapidly becoming a logistics hub with its expanding infrastructure and rapid...',
    content: `Delhi NCR is rapidly becoming a logistics hub with its expanding infrastructure and rapid development over the past few years. This has led to an all-time high demand for commercial real estate and warehousing properties in the region. Although free listings are great, finding the perfect tenant from thousands of list properties online can be a difficult task. Listed below are a few tips to help attract the attention of potential businesses for your warehouse lease through an online listing.

    The region offers businesses massive industrial zones with a variety of modern amenities that are appealing to many potential logistics and e-commerce companies. Several superlative developers are building warehouse projects to meet the spike in demand. Apart from buying commercial property, leasing a real estate property can be tricky in Delhi NCR if not presented correctly. Although many reputed real estate websites offer free listings, finding the right tenant and profitably leasing your property requires a lot of work.

    ## Detailed Market Study

    This is the first step to help you lease your warehouse easily. Understand the present market lease rate of properties that are in and around your neighbourhood. This will provide you with an idea about the leasing price of your warehouse.

    If you keep the price higher than the neighbouring properties, the chances of getting good tenants will automatically reduce as no one wants to pay a higher price for a property in a similar area. If you keep the price too low, you might lose money on the lease of your property. Hence, conduct proper research to ensure that the leasing price of your warehouse is right.

    ## Physical Condition of the Warehouse

    This is another important aspect of leasing your property at a good price. If the warehouse is in fine condition it will attract the attention of many potential businesses. This also allows you upper-hand during the lease of the property as you can choose the tenant with the highest bid. Therefore, make sure to do any repair or maintenance work on your property before the lease of the warehouse for a higher return.

    ## Leasing Price

    To make a profit from the lease of any property, you should have the right leasing price. Depending on the current market rate, analyse the right leasing price by taking into account the cost of the warehouse, repairs done, the closing amount on the lease of the property, and finally the profit that you desire to make. If you are hiring a professional then you also have to add that expense to get the perfect leasing price for your warehouse to make any profit.

    ## Hire a Professional

    If you are new to the leasing of commercial property, it is wise to hire a professional to get a better insight into the process. The professional will help fix the leasing price of your property, guide you to find the right tenant, get a detailed background check, help close the deal, etc., and various other services. This will help you to lease the property easily and quickly too. So, list properties for lease and get assured to have a timely conversion.

    The above-mentioned tips will be very helpful at the time of the lease of your warehouse. You can also take advantage of the information given on commercial properties for lease in Delhi NCR online websites to get an insight into what kind of property attracts the most interest from potential businesses.

    This will allow you to make the changes accordingly to your property and help you find a latent tenant for the lease of your warehouse. Before making the final decision, make sure to have a private conversation with the interested tenant to rest assure that they are the right fit.`,
    tags: ['Warehouse in Delhi', 'Commercial Real Estate', 'Property for Lease']
  },
  {
    title: 'Upcoming Industrial Corridors around Delhi NCR',
    author: 'Teralease Insights',
    category: 'Industrial',
    date: '2026-06-16',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
    excerpt: 'The expanding industrial corridors have transformed the way businesses operate within the National...',
    content: `The expanding industrial corridors have transformed the way businesses operate within the National Capital Region.
    
    ## Why Invest Here
    New highways and expressways provide better connectivity, reducing transit times dramatically.`,
    tags: ['Industrial', 'Development']
  },
  {
    title: 'Commercial Property Registration: Details, Documents, Process and Charges',
    author: 'Teralease Insights',
    category: 'Legal',
    date: '2026-06-17',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=1200&h=600&fit=crop',
    excerpt: 'Purchasing a commercial space in India is regarded as a significant milestone, a kind of success tha...',
    content: `Purchasing a commercial space in India is regarded as a significant milestone, a kind of success that demands careful legal paperwork.
    
    ## The Registration Process
    Ensure all your documents are verified before stepping into the registrar's office.`,
    tags: ['Legal', 'Registration']
  }
];

const testimonialsData = [
  {
    name: "Arun Sharma",
    role: "Warehouse Owner",
    content: "Listing my industrial shed on Teralease was the best decision. The premium UI attracted verified corporate tenants within just two weeks. Highly recommended for commercial owners!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Desai",
    role: "Retail Investor",
    content: "The interface is so clean and professional compared to other platforms. I found a perfect retail shop in Dharuhera exactly matching my budget and location requirements.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Rakesh Singh",
    role: "Logistics Manager",
    content: "We needed a 50,000 sq ft warehouse urgently. Teralease's detailed property listings with clear specifications saved us months of site visits. Fantastic platform.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/85.jpg"
  }
];

const seedExtras = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    // Clear existing
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing collections');

    await Blog.insertMany(blogsData);
    await Testimonial.insertMany(testimonialsData);
    console.log('Seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedExtras();
