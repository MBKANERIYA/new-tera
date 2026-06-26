# Changelog

### 2026-06-26 — Configured Project for Vercel Deployment
**What**: Prepared the frontend and backend for deployment on Vercel as a single monorepo project.
**Why**: User requested to deploy the application on Vercel using `experimentalServices`, which required specific configuration for routing and API calls.
**Files Changed**:
- `vercel.json`: Replaced the legacy `builds` configuration with the `experimentalServices` snippet provided by the user, mapping the frontend to `/` and the backend to `/_/backend`.
- `frontend/src/**/*.jsx`: Stripped all hardcoded `http://localhost:5001/api` URLs from `fetch` calls, replacing them with dynamic relative paths (`/_/backend/api/...`). This ensures the app seamlessly hits Vercel Serverless Functions in production while working locally.y.
- `frontend/vite.config.js`: Configured a local Vite development proxy to automatically route `/api` requests to the local Express backend running on port `5001`.

## 2026-06-26 — Initialized Git Repository and Pushed to GitHub
**What**: Initialized git, added a root `.gitignore`, committed all files, and pushed the codebase to the `new-tera` GitHub repository.
**Why**: User requested to push the local codebase to their GitHub repository for version control and remote backup.
**Files Changed**:
- `.gitignore`: Created a root-level ignore file to prevent sensitive data (`.env`, `node_modules`, etc.) from being tracked.

## 2026-06-25 — Added Inquiry System
**What**: Created an end-to-end property inquiry system allowing users to contact property owners.
**Why**: Facilitate communication between potential buyers/renters and property owners directly through the platform.
**Files Changed**:
- \ackend/models/Inquiry.js\: Created the new Mongoose model to store inquiries (name, number, city, propertyId, ownerMobile).
- \ackend/routes/inquiryRoutes.js\: Added POST route for creating inquiries and GET route for owners to fetch their received inquiries.
- \ackend/index.js\: Registered the new \/api/inquiries\ router.
- \rontend/src/pages/PropertyDetails.jsx\: Added an interactive modal form triggered by the 'Send Message' button to collect inquiry data and send it to the backend.
- \rontend/src/pages/UserEnquiries.jsx\: Created a new dashboard page for property owners to view all inquiries they've received, grouped with property details.
- \rontend/src/App.jsx\: Added the \/user/enquiries\ route.
- \rontend/src/pages/UserManageProperties.jsx\ & \UserDashboard.jsx\: Wired up the 'Enquiries' sub-navigation button to navigate to the new Enquiries page.
\
## 2026-06-25 — User Portal Edit and Delete Functionality
**What**: Fully implemented Edit and Delete functionalities for user-submitted properties in the Teralease frontend.
**Why**: Standard users needed the ability to manage, modify, and delete their existing property listings.
**Files Changed**:
- \rontend/src/pages/UserManageProperties.jsx\: Connected the 'Delete' button to the \DELETE /api/properties/:id\ endpoint and implemented state filtering upon successful deletion. Connected the 'Edit' button to navigate to \/user/edit-property/:id\.
- \rontend/src/App.jsx\: Registered a new Route for \/user/edit-property/:id\ mapping to \UserPostProperty\.
- \rontend/src/pages/UserPostProperty.jsx\: Refactored to support edit-mode workflows. Added \useParams\ to detect the presence of an ID in the route. Implemented a \useEffect\ hook to dynamically fetch the existing property by ID and populate all form fields (including nested \categoryData\, \extraFields\, and arrays). Added robust media tracking state (\existingGallery\, \emoveMain\, \emoveVideo\) to allow users to modify media gracefully. Updated \handleSubmit\ to conditionally use \PUT\ and point to \/api/properties/:id\ when updating an existing listing. Updated dynamic UI text for the 'Update' mode.
\
## 2026-06-25 — Added Automatic Navigation after Property Submission
**What**: Updated UserPostProperty.jsx and AdminPostProperty.jsx to automatically navigate to the dashboard after a successful property submission.
**Why**: Enhances user experience by automatically returning the user or admin to their respective dashboard instead of remaining on the cleared form after posting a property. A 1.5-second delay was implemented so the success message can be read before redirection.
**Files Changed**:
- rontend/src/pages/UserPostProperty.jsx: Added setTimeout to trigger 
avigate('/user/dashboard') on successful property submission.
- rontend/src/pages/AdminPostProperty.jsx: Added setTimeout to trigger 
avigate('/admin/dashboard') on successful property submission.

## 2026-06-25 — Fixed Failed Property Error (Port Conflict)
**What**: Resolved the 'Failed to add property' error by changing the Teralease backend port to 5001.
**Why**: Both the Teralease project and the Mahalaxmi Realty (new-mh) project were configured to run their backend APIs on port 5000. When new-mh was running, Teralease frontend requests were incorrectly routed to the new-mh backend, resulting in a 'Failed to create property' schema mismatch error.
**Files Changed**:
- ackend/.env: Updated backend to listen on PORT=5001.
- rontend/src/**/*.jsx: Updated all etch calls from http://localhost:5000 to http://localhost:5001.

## 2026-06-24 â€” Redesigned Admin Dashboard UI to Match Mockup
**What**: Completely overhauled the frontend to use live database properties and styled the `AdminDashboard.jsx` form.
**Why**: User requested the form to look exactly like a provided design screenshot and all dummy properties across the landing page and collection to be replaced with 50 live db properties mapped to the new backend schema.
**Files Changed**:
- `frontend/src/components/LatestProperties.jsx`: Removed static arrays for `saleProperties` and `leaseProperties`. Added a `useEffect` hook to fetch live properties from `/api/properties` and filter them into the respective sliders. Updated slider card field mappings (e.g., `item.id` -> `item._id`, `item.specs` -> `item.totalArea`).
- `frontend/src/pages/PropertyDetails.jsx`: Removed hardcoded `dummyWarehouseProperty`. Implemented dynamic fetching using `useParams()` ID to query `/api/properties/:id`. Added safe fallbacks for missing `categoryData` fields to prevent crashes, mapped realistic properties, and implemented a loading state. Added a "Video Tour" section below the property specs using `dangerouslySetInnerHTML` to render YouTube iframes stored in the database. Updated the thumbnail gallery to show a maximum of 3 images on the right side, where the 3rd image features a clickable `+N Photos` overlay that opens a stunning full-screen grid modal containing all the property's images. Inside the gallery grid, clicking any individual image now opens it in a true, edge-to-edge full-screen viewer which has been fully upgraded with "Next" and "Previous" slider arrows and a photo counter (e.g. 1/8) to seamlessly navigate all images.
- `backend/routes/propertyRoutes.js`: Added a new `GET /:id` endpoint to allow single property fetching by ID.
- `frontend/src/pages/PropertyCollection.jsx`: Replaced hardcoded dummy data with a `useEffect` hook to dynamically fetch properties from `http://localhost:5000/api/properties`. Updated all mapped fields to correctly correspond to the backend MongoDB schema (e.g. `item._id`, `item.totalArea`, etc.). Implemented dynamic, state-driven pagination limiting the display to exactly 10 properties per page and rendering interactive, responsive Next/Prev controls. Refined pagination logic to strictly display a maximum of 3 page numbers at any time for an ultra-clean UI. Integrated `useSearchParams` to read query parameters (`listingType`, `propertyType`, `search`) from the URL and apply them instantly on mount, enabling functional cross-page search filtering. Resolved an issue where properties listed as "Both" (Sale & Lease) were being incorrectly filtered out when actively searching.
- `frontend/src/components/Hero.jsx`: Made the Hero search bar completely workable. Users can now select a transaction tab (Sell/Lease), pick a property type from the dropdown, and enter a free-text search (locality, project, or landmark). Clicking search dynamically constructs a URL query string and navigates to the Property Collection page where the filters are seamlessly applied. Upgraded the text input with an **auto-complete suggestion dropdown** that dynamically fetches live database properties and suggests matching localities, cities, or property titles as you type. Fixed a CSS stacking context bug by elevating the Hero section's `z-index`, ensuring the autocomplete dropdown correctly overlaps the sections below instead of hiding behind them. Refined the autocomplete logic to only trigger after typing at least 2 characters, and replaced the hard 5-item limit with a sleek, scrollable overflow container so users can view all matching suggestions. Implemented **Context-Aware Filtering** for suggestions: the dropdown will now actively respect your selected transaction tab (e.g., "Lease") and property category (e.g., "Commercial"), ensuring you only see relevant auto-completes. Correctly mapped the frontend "Sell" tab to query the backend "Sale" database flag to resolve empty suggestion returns. Upgraded autocomplete UX: clicking a specific property title suggestion instantly navigates directly to that property's detail page, while clicking a city/locality suggestion instantly executes the search and navigates to the Collection page, skipping the need to manually click the Search button. Fixed a severe bug that caused a blank white screen upon searching by updating the navigation path from `/collection` to `/properties` to accurately match the `App.jsx` React Router configuration.
- `frontend/src/pages/PostPropertyAuth.jsx` & `backend/routes/authRoutes.js`: Completed full-stack authentication integration! Built a MongoDB `User` schema capturing Name, Mobile, Email, Location, UserType, and Purpose. Implemented an Express `/api/auth/login` endpoint that either creates a new user profile or updates an existing user profile (matched by Mobile) and returns the authenticated user payload. Updated the frontend `PostPropertyAuth` form to correctly submit state data via a `fetch` POST to this endpoint with integrated loading states (`disabled` buttons with Tailwind loading spinners). Upon successful authentication, the authenticated user object is saved directly into local `localStorage` and the application redirects seamlessly to `/admin/dashboard`. Executed a **premium UI overhaul** of the authentication page, aligning it precisely with the main theme colors (Deep Blue `#2a5b9e` and Red `#da251d`). Converted the plain orange button into a beautiful premium blue gradient `bg-gradient-to-r from-[#2a5b9e] to-[#3876c4]` with interactive hover scaling. Installed `bcryptjs` and integrated secure, encrypted `password` handling in the backend. Added mandatory "Password" and "Confirm Password" input fields to the frontend UI with validation logic ensuring they perfectly match before submission. Built a dynamic `isLogin` state toggle modeâ€”allowing users to instantly switch between a minimal "Login" view (Email/Mobile + Password) and the full "Create Account" registration view by clicking the "Already registered? Login to continue" text prompt right beneath the main submit button. Reconfigured the post-authentication routing to seamlessly drop logged-in users directly into their personal `UserDashboard` instead of the global `AdminDashboard`.
- `frontend/src/pages/UserDashboard.jsx` & `frontend/src/pages/UserPostProperty.jsx`: Created a completely new, dedicated user-facing portal! Built `UserDashboard.jsx` as the central hub for authenticated users. **Massively redesigned the User Dashboard** to structurally emulate the RealEstateIndia portal while using the exact Teralease color system (Blue `#2a5b9e` and Red `#da251d`). Built a scrollable sub-navigation bar with quick tabs (Dashboard, Properties, Enquiries, Property Leads). Replaced the simple metric cards with four large, solid-color insight cards (Red, Amber, Blue, Green) featuring large watermark icons and clean typography. Created a quick-action button row with outline styling and hover states. Built a 3-column lower grid to manage "Latest Enquiries", "Property Buyers" (leads), and a detailed "My Property Stats" list with color-coded pill badges for each property status condition. Included a dedicated Logout button within the dashboard header. Duplicated and repurposed the `AdminDashboard.jsx` specifically for standard users by creating `UserPostProperty.jsx`. Stripped out the "Admin Portal" labels, re-branded it as "User Portal - List Your Property", and tied its navigation "Back" and "Exit" buttons directly to the newly created `UserDashboard`. Registered both new routes (`/user/dashboard` and `/user/post-property`) securely within `App.jsx`. Configured properties submitted by standard users via `UserPostProperty.jsx` to correctly map the `submittedBy` field to the authenticated user's mobile number.
- `frontend/src/pages/UserDashboard.jsx` & `frontend/src/pages/UserPostProperty.jsx`: Created a completely new, dedicated user-facing portal! Built `UserDashboard.jsx` as the central hub for authenticated users. **Massively redesigned the User Dashboard** to structurally emulate the RealEstateIndia portal while using the exact Teralease color system (Blue `#2a5b9e` and Red `#da251d`). Built a scrollable sub-navigation bar with quick tabs (Dashboard, Properties, Enquiries, Property Leads). Replaced the simple metric cards with four large, solid-color insight cards (Red, Amber, Blue, Green) featuring large watermark icons and clean typography. Created a quick-action button row with outline styling and hover states. Built a 3-column lower grid to manage "Latest Enquiries", "Property Buyers" (leads), and a detailed "My Property Stats" list with color-coded pill badges for each property status condition. Included a dedicated Logout button within the dashboard header. Duplicated and repurposed the `AdminDashboard.jsx` specifically for standard users by creating `UserPostProperty.jsx`. Stripped out the "Admin Portal" labels, re-branded it as "User Portal - List Your Property", and tied its navigation "Back" and "Exit" buttons directly to the newly created `UserDashboard`. Registered both new routes (`/user/dashboard` and `/user/post-property`) securely within `App.jsx`. Configured properties submitted by standard users via `UserPostProperty.jsx` to correctly map the `submittedBy` field to the authenticated user's mobile number.
- `frontend/src/pages/UserDashboard.jsx` Live Data Integration: Successfully wired the beautiful User Dashboard metrics to live database properties! Created a `useEffect` hook to fetch all properties from the `/api/properties` endpoint and filter them down to only properties matching the authenticated user's mobile number (`submittedBy === user.mobile`). Created dynamic logic to count and calculate `propForSale` (`listingType: 'Sale'`), `propForRent` (`listingType: 'Lease'`), `activeSale` (Sale + Approved), `activeRent` (Rent + Approved), and `pendingProps` (Status: 'Pending'). Mapped all these dynamic counts into the visual Insight Cards and the detailed "My Property Stats" list using a two-digit `.padStart(2, '0')` formatter to ensure a consistent, premium UI look.
- `frontend/src/pages/UserManageProperties.jsx` & Navigation: Transformed the static "Properties" sub-navigation tab into an interactive dropdown menu providing two explicit options: "Manage Properties" and "Post Property". Fixed a CSS stacking context bug by removing `overflow-x-auto` from the sub-navigation container, which was artificially clipping the absolute-positioned dropdown menu and causing unwanted scrollbars. Created a brand new, dedicated `UserManageProperties.jsx` component that accurately mirrors the premium tabular layout specified in the reference screenshots. This table dynamically queries and lists only the logged-in user's properties, providing a rich, multi-column view comprising: **Property Details** (Checkbox, Title, Image Thumbnail, Price, Area, Completion Bar), **Date & Views** (Updated On, Responses, Visitors, and dynamically color-coded Status indicators: Approved, Pending, Rejected), and **Actions** (Edit, Property Refresh, Matching Buyer, Delete). Connected the `Delete` action directly to the backend `DELETE /api/properties/:id` route, allowing users to securely prune their own listings. Registered this new route securely in `App.jsx`. Resolved a React rendering crash ("Info is not defined") by ensuring all required `lucide-react` icons are explicitly imported.
- **Admin Approval Gating**: Secured the main website by implementing strict approval gates. Updated `LatestProperties.jsx`, `PropertyCollection.jsx`, and `Hero.jsx` (Search Autocomplete) to actively filter all `fetch` requests with `.filter(p => p.status === 'approved')`. This ensures that user-submitted properties (`status: 'pending'`) remain completely hidden from the live website until an Admin actively reviews and approves them via the `AdminDashboard`.
- `frontend/src/pages/AdminDashboard.jsx` & `backend/routes/propertyRoutes.js`: Completely redesigned the main `AdminDashboard` into a sophisticated command center, closely matching the premium design spec! Built a brand new, fully responsive layout featuring a fixed left sidebar with interactive navigation tabs ("Property Inventory" and "User Submissions") alongside a dynamic main content area. The dashboard now dynamically fetches live properties from the backend using a `useEffect` hook and intelligently categorizes them into active properties vs. pending submissions. Designed an intuitive top metric section highlighting "Total Properties", "Active Listings", "Pending", and "Unread Msg". Built a robust data table displaying rich property details, dynamic status badges, and Origin tags (ADMIN vs. USER). Included a global search bar to instantly filter the table by property title, city, or location. Added brand new `PUT /api/properties/:id`, `PATCH /api/properties/:id`, and `DELETE /api/properties/:id` Express routes. Integrated action buttons into the dashboard table: Admins can now instantly "Approve" or "Reject" pending user submissions, and "Delete", "View", or "Edit" live properties directly from the table UI, which executes real-time database mutations and dynamically refreshes the interface. Relocated the original admin property posting form into a dedicated `AdminPostProperty.jsx` route accessible via the "+ Create Property" and table "Edit" buttons.
- `frontend/src/pages/AdminPostProperty.jsx`: Upgraded the admin property submission form to seamlessly handle full property editing workflows! Implemented `useParams` from React Router to detect if an ID is present in the `/admin/edit/:id` route. If present, a `useEffect` automatically queries the database and pre-fills the entire complex form state (including nested `categoryData`, extra dynamic field arrays, comma-separated tag strings, and interactive radio/checkbox pills). Built an advanced media tracking state to persist existing Cloudinary media URLs during edits, allowing admins to selectively remove specific existing gallery images or videos while uploading new ones. Refactored the `handleSubmit` function to dynamically switch between a standard `POST` (for new listings) and a `PUT` request (for edits) using the exact same robust `FormData` payload format, providing a perfectly integrated creation and modification experience.
- `frontend/src/components/Header.jsx`: Fully integrated global user session state. Built a `useEffect` hook to read the `property_user` from `localStorage` on mount. Replaced the generic "Hello, Sign In" User Profile block with a dynamic, personalized display showcasing the authenticated user's first name with robust fallback rendering. Converted the user profile block into a clickable `Link` that intuitively navigates the user straight to their `/user/dashboard` (removing the abrupt auto-logout alert).
- `backend/models/Property.js` & MongoDB: Created a script to completely wipe the existing properties database and seeded it with 50 new, highly detailed dummy properties. All properties were constructed using the exact payload structure designed for `AdminDashboard.jsx`. Injected 8 distinct Google Image URLs and a YouTube video iframe into every property to validate media rendering.
- `frontend/src/pages/AdminDashboard.jsx`: Executed a massive UI overhaul to make the dashboard look highly premium. Upgraded to a soft gradient background (`bg-gradient-to-br from-gray-50 to-gray-100/50`), added custom CSS classes for floating cards with deep shadows (`shadow-[0_8px_30px_rgb(0,0,0,0.04)]` increasing on hover), and frosted glass effects (`backdrop-blur-md`). All inputs now feature thick focus rings (`focus:ring-4`) and smooth transitions. Replaced simple checkboxes with interactive pills that scale and change color on click. Added dynamic animated gradient effects to the "Publish Property" button and glass-morphic effects on image removal buttons. Added functional `+ Add Extra Field` buttons to Utilities, Legal, Access, and Security sections allowing dynamic key-value injection into the property payload. Correctly aligned `powerLoad`, `toilets`, `truckSpace`, and `nearestHighway` text inputs. Utilities, Legal, and Security extra fields now use an "Included Feature" toggle aesthetic, while the Access section uses an explicit value input field for numeric distances/descriptions. Increased the main form container width from `max-w-4xl` to `max-w-7xl` for an ultra-wide, spacious layout.
## 2026-06-24 â€” Added Media Removal Option in Previews
**What**: Added interactive "X" buttons on the media previews in the Admin Dashboard, allowing users to remove mistakenly selected images or videos before uploading.
**Why**: User requested the ability to remove an image option during the upload process for better usability.
**Files Changed**:
- `frontend/src/pages/AdminDashboard.jsx`: Imported the `X` icon from `lucide-react`. Added `removeMainImage`, `removeGalleryImage`, and `removeVideo` state handlers. These functions instantly revoke the `URL.createObjectURL` object from memory to prevent leaks, strip the target file out of the React `mediaFiles` state arrays, and clear the `<input>` DOM values. Updated the preview UI to overlay these functional removal buttons.
## 2026-06-24 â€” Enabled Multiple Image & Video Uploads with Previews
**What**: Added support for uploading multiple gallery images and a property video, alongside real-time frontend media previews.
**Why**: User requested the ability to upload multiple images and videos simultaneously while being able to preview the media directly in the Admin Dashboard before submitting.
**Files Changed**:
- `frontend/src/pages/AdminDashboard.jsx`: Replaced the single image file input with an advanced 'Media Uploads' section supporting `mainImage`, multiple `gallery` images, and a `video` file. Added `URL.createObjectURL` logic to render visual previews (including a video player) on the fly, complete with memory cleanup on unmount.
- `backend/routes/propertyRoutes.js`: Upgraded the Cloudinary multer storage configuration to accept video formats (`mp4`, `mov`, `avi`) with `resource_type: 'auto'`. Replaced `upload.single` with `upload.fields` to dynamically process the main image, gallery array, and video, mapping them into the nested `propertyData.images` schema.
## 2026-06-24 â€” Expanded Admin Form to Full Property Schema
**What**: Updated the Admin Dashboard form and Backend Property Model to include the comprehensive set of fields found in the current mock properties.
**Why**: User requested the add property form to have all the same options as the currently used `dummyProperty.js`, which includes dozens of deep metadata fields.
**Files Changed**:
- `frontend/src/pages/AdminDashboard.jsx`: Expanded the form state to hold 50+ fields, grouped into "Core Details", "Location Details", "Property Specs", and "Deep Dive Metadata (Category Data)". Formatted nested `categoryData` into a JSON string via `FormData` before uploading.
- `backend/models/Property.js`: Added `strict: false` to allow for the dynamic saving of the massive payload.
- `backend/routes/propertyRoutes.js`: Added parsers to rebuild `categoryData` and arrays (like `furnishing`, `facilities`, etc.) from incoming FormData strings.
## 2026-06-24 â€” Full-Stack Admin Panel & Backend Integration
**What**: Created an Admin Login (`/admin`) and Dashboard (`/admin/dashboard`), and initialized the Node.js/Express backend with MongoDB and Cloudinary integrations for dynamic property uploads.
**Why**: User requested an admin login system (admin/admin123) leading to a dashboard to add new properties, providing their MongoDB URI and Cloudinary API credentials.
**Files Changed**:
- `backend/package.json`: Initialized backend project and added dependencies (`express`, `mongoose`, `cors`, `dotenv`, `cloudinary`, `multer`, `multer-storage-cloudinary`).
- `backend/.env`: Added MongoDB and Cloudinary connection credentials.
- `backend/models/Property.js`: Created Mongoose schema mirroring frontend property fields.
- `backend/routes/propertyRoutes.js`: Implemented `GET` and `POST` routes with Cloudinary image upload handling.
- `backend/index.js`: Setup Express server, connected to MongoDB, and enabled CORS.
- `frontend/src/pages/AdminLogin.jsx`: Built static login page with credentials check.
- `frontend/src/pages/AdminDashboard.jsx`: Built form for creating new property listings and sending `FormData` (including images) to the new backend API.
- `frontend/src/App.jsx`: Registered `/admin` and `/admin/dashboard` routes.
## 2026-06-24 â€” Made Property Cards Clickable
**What**: Made the entire property card area clickable, routing users directly to the detailed property page.
**Why**: User requested the ability to click anywhere on a property card to open its detail page, improving user navigation.
**Files Changed**:
- `frontend/src/pages/PropertyCollection.jsx`: Added `useNavigate` hook and an `onClick` event handler to the main card container. Implemented event delegation checking (`e.target.closest`) to ensure interactive inner elements (like 'Contact Agent' buttons or links) still function normally without double-triggering navigation. Added `cursor-pointer` utility class for visual feedback.
## 2026-06-24 â€” Made Filter Sidebar Sticky
**What**: Made the left sidebar filter on the Property Collection page sticky on desktop views.
**Why**: User requested the left side filter to be sticky to improve usability when scrolling through long lists of properties.
**Files Changed**:
- `frontend/src/pages/PropertyCollection.jsx`: Added `lg:sticky`, `lg:top-6`, and `lg:self-start` Tailwind classes to the left sidebar container.
## 2026-06-24 â€” Redesigned Property Collection Cards to Horizontal List View
**What**: Completely redesigned the property cards on the Property Collection page from a standard vertical grid to a detailed horizontal list view.
**Why**: User provided a screenshot of a detailed horizontal real estate card design and requested its implementation on the collection page.
**Files Changed**:
- `frontend/src/pages/PropertyCollection.jsx`: Replaced the grid layout with a `flex-col` list. Rewrote the card markup to include an image section with overlays (heart, photo count), a detailed stats grid (Price, Area, Ownership), dynamic tags, and a bottom section featuring Agent details and a "Similar listings" accordion.
- `frontend/src/pages/PropertyCollection.jsx`: Expanded the dummy `propertiesData` schema to include new fields required by the design: `building`, `builtUpArea`, `ownership`, `description`, `tags`, `agent` object, `postedOn`, `imageCount`, and `similarListings`.
## 2026-06-24 â€” Fixed Property Collection Filters
**What**: Implemented state and logic for the 'Property Type' and 'Budget Range' filters on the Property Collection page, and made the 'Property Type' filter options dynamic based on available data.
**Why**: User reported that the filters were not working properly, which was true as they lacked underlying state and filtering logic. User also requested all property types in the dummy data be available as filters.
**Files Changed**:
- `frontend/src/pages/PropertyCollection.jsx`: Added state for selected property types and budget range, integrated dynamic filtering logic, and replaced hardcoded property types with `Array.from(new Set(propertiesData.map(p => p.type)))`.
## 2026-06-23 â€” Linked Most Viewed Properties Grid
**What**: Updated the icons grid in the "Most Viewed Properties" section on the homepage to be clickable links navigating to the Property Collection page.
**Why**: User requested that the category options in the grid be clickable and navigate to the property collection page.
**Files Changed**:
- `frontend/src/components/MostViewedProperties.jsx`: Imported `Link` from `react-router-dom` and replaced the `div` wrapper for each category card with a `<Link to="/properties">`.

## 2026-06-23 â€” Created Property Collection Page
**What**: Added a new "Property Collection" page to display a grid of properties with a robust sidebar filtering system.
**Why**: User requested a property collection page to allow users to browse and filter available listings.
**Files Changed**:
- `frontend/src/pages/PropertyCollection.jsx`: Built the new page containing a responsive layout with a left sidebar for advanced filtering (Transaction Type, Property Type checkboxes, Budget dropdown) and a right-side grid for property cards with dynamic rendering and pagination.
- `frontend/src/App.jsx`: Registered the `/properties` route.

## 2026-06-23 â€” Fixed Logo Navigation
**What**: Wrapped the main logo in the `Header` component with a `react-router-dom` `<Link>` to navigate to the home page.
**Why**: User requested that clicking the logo should navigate back to the home page.
**Files Changed**:
- `frontend/src/components/Header.jsx`: Imported `Link` from `react-router-dom` and replaced the `div` wrapper around the logo with `<Link to="/">`.

## 2026-06-23 â€” Created Property Details Page
**What**: Built a comprehensive Property Details page that dynamically renders property specifications, descriptions, galleries, and owner contact details. 
**Why**: User requested a details page to display full property information.
**Files Changed**:
- `frontend/src/pages/PropertyDetails.jsx`: Created the new component featuring a breadcrumb, premium gallery grid with main image and thumbnails, detailed breakdown mapping over dynamic `categoryData` fields, and an interactive sticky contact form column.
- `frontend/src/App.jsx`: Added the dynamic `/property/:id` route.
- `frontend/src/components/LatestProperties.jsx`: Updated the "View Details" buttons to act as active `<Link>` components pushing to `/property/:id`.

## 2026-06-23 â€” Created Comprehensive Dummy Property Module
**What**: Created `frontend/src/data/dummyProperty.js` exporting a complete dummy JSON property object.
**Why**: User requested a dummy property adhering precisely to the Sequelize model schema and frontend category sections (Warehouse).
**Files Changed**:
- `frontend/src/data/dummyProperty.js`: Added the file containing `dummyWarehouseProperty` with full schema fields (top-level properties) and category-specific metadata (`categoryData`).

## 2026-06-23 â€” Created Contact Us Page
**What**: Added a new "Contact Us" page mimicking a provided design with contact info, map, and a 360-degree view section, and updated routing.
**Why**: User requested the creation of the same contact page that navigates from the footer.
**Files Changed**:
- `frontend/src/pages/ContactUs.jsx`: Created the new page matching the screenshot with a two-column top section (contact info + Google map iframe) and a bottom section mimicking a 360-degree interior viewer with tabs.
- `frontend/src/App.jsx`: Added the `/contact-us` route pointing to the new `ContactUs` component.
- `frontend/src/components/Footer.jsx`: Updated the `Contact Us` link to point to `/contact-us`.

## 2026-06-23 â€” Created About Us Page
**What**: Added a new "About Us" page mimicking a provided corporate design and updated the footer/app routing.
**Why**: User requested the creation of the same about us page that navigates from the footer.
**Files Changed**:
- `frontend/src/pages/AboutUs.jsx`: Created the new page with a 2-column layout (Main content and Sidebar) based on the provided corporate template.
- `frontend/src/App.jsx`: Installed `react-router-dom` and wrapped the application in a `BrowserRouter` with routes for `/` (Home) and `/about-us`.
- `frontend/src/components/Footer.jsx`: Updated the links array to include explicit paths and swapped `<a>` tags with `react-router-dom`'s `<Link>` component for internal navigation.

## 2026-06-22 â€” Upgraded Home Page Cards to Premium Design
**What**: Completely redesigned the 4 top `InfoCards` underneath the Hero section to look ultra-premium.
**Why**: User requested the home page cards be upgraded to a premium look.
**Files Changed**: `frontend/src/components/InfoCards.jsx`
- Replaced the basic flat background colors with rich, dark, ultra-premium gradients (Midnight Blue, Premium Gold, Emerald Teal, and Burgundy).
- Added a glassmorphic shine effect that glides across the card on hover.
- Added color-matched, glowing box-shadows that appear when the card elevates on hover.
- Upgraded the buttons to use glassmorphism (`backdrop-blur-md`, `bg-white/10`) with a smooth fill transition.
- Enhanced the background decorative Lucide icons to dramatically rotate and scale up dynamically on hover.
- Refined the typography and updated the copy to focus strictly on commercial/industrial logistics and elite brokers.


## 2026-06-22 â€” Fixed Footer Rendering Bug
**What**: Resolved a "white screen" application crash caused by a missing export in the `lucide-react` library.
**Why**: The version of `lucide-react` installed in the project (`v1.21.0`) was outdated and did not contain the `Facebook`, `Youtube`, `Instagram`, or `Rss` icons, causing Vite to throw an Uncaught SyntaxError and crash the app.
**Files Changed**: `frontend/src/components/Footer.jsx`
- Removed the `lucide-react` import statement for the social icons.
- Replaced the missing components with hardcoded, responsive SVG paths for Facebook, RSS, YouTube, and Instagram. This ensures the UI remains stable regardless of the icon library version.


## 2026-06-22 â€” Replaced Footer Component
**What**: Completely redesigned the global `Footer.jsx` component.
**Why**: User provided a screenshot of a specific footer layout they wanted to replicate.
**Files Changed**: `frontend/src/components/Footer.jsx`
- Replaced the previous 5-column dark layout with the requested light-themed layout.
- Added a top navigation row separated by pipes (`|`) with a custom dual-colored "LIVE COVERAGE" badge.
- Added a middle row featuring SVG badges for Google Play and App Store on the left, and colored social media squares on the right (Facebook, RSS, Pinterest, X, YouTube, Instagram).
- Added the long legal disclaimer block with justified text alignment.
- Added the bottom dark-grey copyright bar adapted for "Teralease Pvt. Ltd."


## 2026-06-22 â€” Created Market Overview Section
**What**: Added "An Overview of the Delhi NCR Real Estate Market" section.
**Why**: User provided a screenshot of a textual overview block with expand/collapse functionality and a 4-column stats row.
**Files Changed**: 
- `frontend/src/components/MarketOverview.jsx`: Created a new responsive component. Implemented dynamic text expansion/collapse using React `useState` (for the "more" / "less" toggle) to mirror the screenshot. Adapted the descriptive text and stats (e.g., 5869+, 260+) to reflect the platform's Industrial/Commercial focus within the Delhi NCR region, replacing residential references with "Industrial Properties", "Warehouse Spaces", and "Property for Lease".
- `frontend/src/pages/Home.jsx`: Imported and rendered `<MarketOverview />`.


## 2026-06-22 â€” Created Real Estate Blogs Section
**What**: Added an "Explore Delhi NCR Real Estate Blogs" section featuring a 4-column card grid.
**Why**: User provided a screenshot of a blog grid layout and requested a premium replication below the Latest Properties section.
**Files Changed**: 
- `frontend/src/components/RealEstateBlogs.jsx`: Created a new responsive grid component for displaying blog previews. Implemented high-quality card designs with exactly 50% image height, crisp borders, and a clean white background. Added premium hover effects, including a slow image scale-up and subtle card shadow enhancement. Populated the dummy data with industrial/commercial focused articles (e.g., Warehouse leasing tips, Industrial Corridors).
- `frontend/src/pages/Home.jsx`: Imported and rendered `<RealEstateBlogs />`.


## 2026-06-22 â€” Updated Wording in Latest Properties Section
**What**: Changed all instances of "Rent" to "Lease" in the Latest Properties section.
**Why**: User specifically requested the platform focus on commercial "Lease" terminology rather than residential "Rent".
**Files Changed**: `frontend/src/components/LatestProperties.jsx`
- Updated the section header to "Latest Properties for Sale / Lease".
- Updated the slider title to "Property for Lease".
- Refactored internal variable names (`rentProperties` to `leaseProperties`) for consistency.


## 2026-06-22 â€” Created Latest Properties Section
**What**: Added a "Latest Properties for Sale / Rent" section featuring dual horizontal image sliders.
**Why**: User provided a screenshot of a dual-row property slider layout and requested its replication.
**Files Changed**: 
- `frontend/src/components/LatestProperties.jsx`: Created a new responsive dual-slider component. Replicated the distinctive card design: embedded the black "ribbon" price tag overlay (`clip-path` arrow shape) directly on the bottom-left of the property image, added the orange property-type label, bold size specs, grey location text, and the blue outlined "View Details" button. Populated the two sliders ("Property for Sale" and "Property for Rent") with Industrial/Commercial specific dummy data focused on the Delhi NCR region. Added smooth `useRef` based scrolling functionality to the side arrows.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<LatestProperties />`.


## 2026-06-22 â€” Created Most Viewed Properties Section
**What**: Added a "Most Viewed Properties in Delhi NCR" grid section below Insights & Tools.
**Why**: User provided a screenshot of a dense icon-based property grid and requested it to be populated exclusively with categories related to their 3 core types (Industrial, Warehouse, Commercial).
**Files Changed**: 
- `frontend/src/components/MostViewedProperties.jsx`: Created a new responsive flex-wrap grid containing 14 small square cards. Replicated the exact card style: white background with a faint border, an icon centered inside a thin light-blue circular ring, and dark grey text below. Curated the list to feature only Industrial (Plots, Factory Sheds, etc.), Warehouse (Cold Storage, Godowns, etc.), and Commercial (IT Parks, Retail Shops, etc.) items.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<MostViewedProperties />`.


## 2026-06-22 â€” Created Insights & Tools Section
**What**: Added a premium 4-column "Insights & Tools" section below the Top Agents slider.
**Why**: User provided a screenshot of 4 content/tool cards and requested a premium replica.
**Files Changed**: 
- `frontend/src/components/InsightsTools.jsx`: Created a new responsive grid component. Implemented a very faint blue background (`bg-[#f7fafe]`) for the cards to match the screenshot. Designed high-fidelity icon containers featuring subtle background gradients, smooth scaling animations, and dual-tone `lucide-react` icons to replace the complex illustrations from the screenshot while maintaining a premium feel. Replicated typography and the interactive "Explore Now" outlined button with an animated right arrow.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<InsightsTools />`.


## 2026-06-22 â€” Created Top Agents Section
**What**: Added a "Top Real Estate Agents" horizontal slider section below the Popular Localities.
**Why**: User provided a screenshot of an agent directory grid/slider and requested its replication.
**Files Changed**: 
- `frontend/src/components/TopAgents.jsx`: Created a new responsive CSS Grid component using `grid-rows-2` and `grid-flow-col` to achieve the exact stacked 2-row layout. Implemented detailed agent cards featuring a circular logo, segmented stats for "Sale" and "Rent" properties, and a pill-based tagging system at the bottom (with special styling for the "+X" overflow tags). Replicated the exact data from the screenshot but adjusted locations to "Delhi NCR" context.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<TopAgents />`.


## 2026-06-22 â€” Fixed Popular Localities Slider Functionality
**What**: Added interactive scrolling functionality to the Popular Localities horizontal slider.
**Why**: User reported that the slider navigation arrows were unresponsive.
**Files Changed**: `frontend/src/components/PopularLocalities.jsx`
- Imported and utilized the `useRef` hook to target the horizontal scrolling container.
- Implemented `scrollLeft` and `scrollRight` helper functions that smoothly shift the container by 400px when the left or right chevron buttons are clicked.


## 2026-06-22 â€” Expanded Popular Localities Slider
**What**: Increased the number of slides in the Popular Localities section to 7.
**Why**: User specifically requested 7 slides in the carousel.
**Files Changed**: `frontend/src/components/PopularLocalities.jsx`
- Expanded the `localities` array by adding data for Noida Sector 62, Manesar, and Faridabad NIT, bringing the total item count to exactly 7.


## 2026-06-22 â€” Created Popular Localities Section
**What**: Added an "Explore Popular Localities" horizontal slider below the Real Estate Services section.
**Why**: User provided a screenshot of a specific locality slider design with Buy/Rent split stats and requested it be replicated.
**Files Changed**: 
- `frontend/src/components/PopularLocalities.jsx`: Created a new responsive slider component. Replicated the exact card design: light blue top border (`border-t-blue-300`), internal dividers separating "Buy" and "Rent" metrics, green tag/key icons, and purple chevron navigation arrows on the left/right. Adjusted placeholder data to focus on "Delhi NCR" regions like Okhla and Sector 83.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<PopularLocalities />`.


## 2026-06-22 â€” Created Real Estate Services Section
**What**: Added a new grid section for "Real Estate Services" below the Discover Properties section.
**Why**: User provided a screenshot and requested a premium replica of the 8-card services grid.
**Files Changed**: 
- `frontend/src/components/RealEstateServices.jsx`: Created a new component with a 4-column responsive grid containing 8 service cards. Implemented the specific card design from the screenshot: white background, light blue outline "Read More" buttons, and a decorative soft grey rounded corner in the bottom right containing customized `lucide-react` icons. Added smooth hover animations to elevate the premium feel.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<RealEstateServices />`.


## 2026-06-22 â€” Aligned Slide Width to Sidebar
**What**: Updated the width of the property cards in the slider to perfectly match the left sidebar.
**Why**: User requested that all slides be exactly the same size as the left box.
**Files Changed**: `frontend/src/components/DiscoverProperties.jsx`
- Changed the slide `min-w` properties to a rigid `w-full md:w-[320px]`, ensuring both the left accordion box and all image slides share the exact same 320x320 pixel dimensions on desktop.


## 2026-06-22 â€” Realigned Discover Properties Layout
**What**: Restructured the layout of the Discover Properties section to match exact alignment specifications.
**Why**: User requested the left box (accordion) and the right slides to be the exact same size, and the filter pills to start directly above the first slide.
**Files Changed**: `frontend/src/components/DiscoverProperties.jsx`
- Grouped the layout into two distinct columns (Left: Sidebar, Right: Pills + Slider).
- Aligned the filter pills to start exactly above the first image on the right.
- Set both the left accordion box and the image slides to a strict matching height (`h-[320px]`).
- Added an invisible spacer above the left box to perfectly offset the height of the pill row on the right, ensuring flawless horizontal alignment.


## 2026-06-22 â€” Split Lease and Sublease Options
**What**: Updated the Discover Properties sidebar to feature 3 distinct options.
**Why**: User specifically requested separate entries for "Sale", "Lease", and "Sublease".
**Files Changed**: `frontend/src/components/DiscoverProperties.jsx`
- Expanded `sidebarOptions` to include "Properties for Lease" and "Properties for Sublease" as standalone items with unique descriptive text.


## 2026-06-22 â€” Reverted Discover Properties Sidebar Default
**What**: Updated the left sidebar accordion in the `DiscoverProperties` section to default to "Properties for Sale".
**Why**: User specifically requested the default to be "Sale", and the second option to be "Lease/Sublease".
**Files Changed**: `frontend/src/components/DiscoverProperties.jsx`
- Changed the `activeSidebar` default state to `Properties for Sale`.
- Renamed the second option in `sidebarOptions` to `Properties for Lease/Sublease`.


## 2026-06-22 â€” Updated Discover Properties Sidebar and Slider
**What**: Updated the left sidebar accordion and right image slider in the `DiscoverProperties` section.
**Why**: User specifically requested the sidebar to default to "Lease" and "Sublease" options (removing "Sale"), and to expand the slider to feature exactly 10 property cards.
**Files Changed**: `frontend/src/components/DiscoverProperties.jsx`
- Refactored the hardcoded sidebar into a dynamic, interactive accordion with two state-driven options: "Properties for Lease" (default active) and "Properties for Sublease".
- Updated the `propertyCards` array to contain exactly 10 distinct, high-quality industrial/commercial property image cards.


## 2026-06-22 â€” Created Discover Properties Section
**What**: Added a new "Discover More Properties" section directly below the InfoCards.
**Why**: User requested to recreate a specific layout containing a sidebar filter and horizontal image carousel.
**Files Changed**: 
- `frontend/src/components/DiscoverProperties.jsx`: Built the complex layout featuring a header, customized filter pills (Industrial, Warehouse, Commercial), an interactive left sidebar menu for Sale/Rent, and a responsive horizontal scrolling image grid with hover effects.
- `frontend/src/pages/Home.jsx`: Imported and rendered `<DiscoverProperties />`.


## 2026-06-22 â€” Created Premium InfoCards Section
**What**: Added a set of 4 premium-looking informational/action cards directly below the Hero section.
**Why**: User provided a screenshot of 4 distinct colored cards (Blue, Yellow, Teal, Maroon) detailing features and stats, requesting a premium replica.
**Files Changed**: 
- `frontend/src/components/InfoCards.jsx`: Created a new component with a grid layout containing 4 beautifully styled cards with exact color matching, custom icons from `lucide-react`, and neat hover effects. Kept text tailored to "Delhi NCR" per earlier user adjustments.
- `frontend/src/pages/Home.jsx`: Imported and added `<InfoCards />` right below `<Hero />`.


## 2026-06-22 â€” Removed Hero Heading Background
**What**: Removed the translucent white background pill from the main Hero heading.
**Why**: Per user request to make the text float naturally above the background without a container.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Removed `bg-white/40`, padding, and rounded classes from the `h1` element.


## 2026-06-22 â€” Removed Native Scrollbars
**What**: Removed the ugly right/bottom native scrollbars from scrollable containers.
**Why**: User noticed a right scroll button/bar disrupting the premium aesthetic.
**Files Changed**: 
- `frontend/src/index.css`: Added global `.no-scrollbar` utility classes to hide `-webkit-scrollbar`.
- `frontend/src/components/Hero.jsx`: Applied `no-scrollbar` to both the tab row and the dropdown menu.


## 2026-06-22 â€” Upgraded Hero Search Bar to Premium Glassmorphism
**What**: Redesigned the Hero section search container to feature a modern, premium glassmorphism aesthetic.
**Why**: User specifically requested a "premium looking searchbar" to elevate the application's design above the standard layout.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Replaced the solid grey search background with a translucent glass layer (`bg-white/10 backdrop-blur-md`).
- Redesigned tabs into floating pill shapes with hover and active states (scale animations, shadows).
- Upgraded the inner search input row with soft inner shadows, rounded corners, and a gradient search button.
- Improved typography sizes and spacing for a more high-end feel.


## 2026-06-22 â€” Updated Hero Background to Industrial
**What**: Swapped the Hero section background image to a pure industrial/warehouse theme.
**Why**: User specifically requested an "industrial type" image rather than the previous commercial glass building.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Updated the Unsplash URL to feature a massive logistics/warehouse and shipping container scene.


## 2026-06-22 â€” Added Commercial/Industrial Hero Background
**What**: Restored a background image to the Hero section, using a high-quality commercial/industrial real estate image.
**Why**: User specifically requested a commercial/industrial type background for the hero section to align with the platform's core property types.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Added the `backgroundImage` inline style using an Unsplash placeholder of a modern commercial building.
- Restored `bg-cover`, `bg-center`, and `bg-no-repeat` Tailwind classes.


## 2026-06-22 â€” Removed Hero Background Image
**What**: Removed the residential skyline background image from the Hero section.
**Why**: User specifically requested to remove the residential type background, keeping in line with the commercial/industrial focus of the platform until actual images are provided.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Replaced the inline `backgroundImage` with a premium, subtle CSS gradient (`bg-gradient-to-br from-[#d9e2ec] to-[#f0f4f8]`).


## 2026-06-22 â€” Made Property Types Dropdown Interactive
**What**: Added an interactive custom dropdown menu to the "Property Types" selector in the `Hero.jsx` search bar.
**Why**: User requested the ability to select from the property types (Sell, Lease, Sub-Lease, Industrial, etc.) within the search bar.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Added React state hooks (`isPropertyTypeOpen`, `selectedPropertyType`) to manage the dropdown's visibility and selected value.
- Replaced the static "Property Types" div with a functional dropdown menu overlay containing the requested types (`Sell`, `Lease`, `Sub-Lease`, `Industrial`, `Warehouse`, `Commercial`).
- Added an invisible click-away backdrop to close the dropdown when clicking outside.
- Added smooth chevron rotation animation when the menu opens/closes.


## 2026-06-22 â€” Replicated RealEstateIndia Hero Section
**What**: Updated the `Hero.jsx` component to match the realestateindia.com search container layout.
**Why**: Per user's direct request.
**Files Changed**: `frontend/src/components/Hero.jsx`
- Added the city skyline placeholder background with a slight overlay.
- Styled the main heading text to match the font weighting and blue highlighted city name.
- Implemented the dark grey search container box.
- Built the category tabs with the active tab featuring a white background and CSS triangle pointer overlapping the search bar.
- Recreated the bottom search bar with the "Property Types" dropdown, "Search Locality" input with target icon, and the blue "SEARCH" button with a magnifying glass icon.


## 2026-06-22 â€” Replicated RealEstateIndia Header
**What**: Updated the `Header.jsx` component to precisely match the user's provided screenshot of the realestateindia.com header.
**Why**: Per user's direct request.
**Files Changed**: `frontend/src/components/Header.jsx`
- Implemented the custom REI logo using SVG.
- Added city selector dropdown with chevrons.
- Styled navigation links matching the original font sizes and colors.
- Added a "Post Property" pill button with an overlapping absolute "FREE" badge.
- Added user profile section with rounded avatar, welcome text, and help circle icon.


## 2026-06-22 â€” Migrated to Tailwind CSS v4
**What**: Integrated Tailwind CSS v4 and refactored all components to use Tailwind utility classes.
**Why**: Per user request to remove custom CSS and utilize Tailwind CSS for styling.
**Files Changed**: `frontend/package.json`, `frontend/vite.config.js`, `frontend/src/index.css`, `frontend/src/components/*`
- Installed `tailwindcss` and `@tailwindcss/vite`.
- Configured Vite with Tailwind v4 plugin.
- Replaced custom vanilla CSS in `index.css` with `@import "tailwindcss";` and custom `@theme` variables.
- Refactored `Header.jsx`, `Hero.jsx`, `Categories.jsx`, `FeaturedProperties.jsx`, `CTA.jsx`, and `Footer.jsx` to use Tailwind utility classes.


## 2026-06-22 â€” Refactored UI into Components
**What**: Restructured the frontend application into a component-based architecture.
**Why**: To improve code maintainability, reusability, and readability as requested by the user.
**Files Changed**: `frontend/src/App.jsx`, `frontend/src/pages/Home.jsx`, `frontend/src/components/*`
- Created `pages/Home.jsx`.
- Extracted sections into `components/` (`Header.jsx`, `Hero.jsx`, `Categories.jsx`, `FeaturedProperties.jsx`, `CTA.jsx`, `Footer.jsx`).
- Updated `App.jsx` to render the `Home` page.


## 2026-06-22 â€” Developed Real Estate Landing Page
**What**: Implemented a responsive real estate landing page mimicking realestateindia.com.
**Why**: To provide the initial user interface as requested.
**Files Changed**: `frontend/index.html`, `frontend/src/App.jsx`, `frontend/src/index.css`
- Updated page title in `index.html`.
- Designed CSS system with premium aesthetic, Google Fonts (Inter), and modern variables.
- Implemented full landing page structure with Hero, Search, Categories, Featured Properties, and Footer sections using Lucide icons.
- Placeholder blocks are set up for future image insertions.


## 2026-06-22 â€” Restructure into Monorepo
**What**: Created `frontend` and `backend` folders and moved Vite project into `frontend`.
**Why**: To set up a full-stack monorepo structure.
**Files Changed**: `frontend/*`, `backend/`
- Created `frontend/` and `backend/` directories.
- Moved React Vite project into `frontend/`.

## 2026-06-22 â€” Initialize Project
**What**: Created a new React Vite project.
**Why**: Initial setup for Teralease application.
**Files Changed**: All initial Vite files
- Bootstrapped project using `npx create-vite@latest`
- Installed dependencies
- Setup `knowledge-base` folder




