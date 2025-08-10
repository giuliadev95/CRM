/*
    Queries to create the
    - contact
    - company
    tables on PostgreSQL
*/

/* COMPANY TABLE */
CREATE TABLE IF NOT EXISTS company (
  id_company SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  company_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



/* CONTACT TABLE */
CREATE TABLE IF NOT EXISTS contact (
  id_contact SERIAL PRIMARY KEY, /* SERIAL is an INTEGER */
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  role VARCHAR(100),
  company_id INTEGER REFERENCES company(id_company),
  details TEXT,
  created_at DATE DEFAULT CURRENT_DATE
);

/* LEFT JOIN */
SELECT contact.*, company.name AS company_name
FROM contact
LEFT JOIN company ON contact.company_id = company.id_company
ORDER BY contact.id_contact;

/* POPULATE THE COMPANY TABLE */
INSERT INTO company (name, phone, email, website, company_type, notes, created_at) VALUES
('ACME', '0362 22 44 77 88', 'acmegroup@acme.it', 'www.acme.com', 'Client', 'Client we supply with oil, gasoline, diesel.', '2025-06-03 20:56:42.163'),
('BetaTech', '0211 45 66 12 33', 'contact@betatech.com', 'www.betatech.com', 'Supplier', 'IT and infrastructure supplier since 2020.', '2025-06-03 20:56:42.163'),
('Gamma Consulting', '0345 98 77 11 44', 'info@gammaconsulting.it', 'www.gammaconsulting.it', 'Partner', 'Consulting partner for compliance and legal.', '2025-06-03 20:56:42.163'),
('DeltaGroup', '0391 55 33 22 11', 'admin@deltagroup.eu', 'www.deltagroup.eu', 'Client', 'Provides logistics support for southern Italy.', '2025-06-03 20:56:42.163'),
('Omega Srl', '0377 22 33 99 21', 'sales@omega-srl.com', 'www.omega-srl.com', 'Prospect', 'Potential future partner.', '2025-06-03 20:56:42.163'),
('NextGen Marketing', '0321 11 22 33 44', 'hello@nextgenmarketing.it', 'www.nextgenmarketing.it', 'Supplier', 'Digital marketing and lead generation.', '2025-06-03 20:56:42.163'),
('FusionWorks', '0388 66 44 55 66', 'info@fusionworks.com', 'www.fusionworks.com', 'Partner', 'Handles CRM development.', '2025-06-03 20:56:42.163'),
('EcoGreen Ltd', '0355 88 77 66 55', 'support@ecogreen.it', 'www.ecogreen.it', 'Supplier', 'Supplies eco-sustainable packaging.', '2025-06-03 20:56:42.163'),
('BlueOcean Spa', '0311 99 88 77 00', 'info@blueoceanspa.it', 'www.blueoceanspa.it', 'Competitor', 'Main competitor in the north.', '2025-06-03 20:56:42.163'),
('NovaTrends', '0302 44 11 22 99', 'info@novatrends.it', 'www.novatrends.it', 'Client', 'Retail chain across Europe.', '2025-06-03 20:56:42.163');

/* SELECT ALL FROM COMPANY */
SELECT * FROM COMPANY;

/* POPULATE THE CONTACT TABLE */
INSERT INTO contact (name, phone, email, role, company_id, details, created_at) VALUES
('Lucia Ferrini', '349 27 34 561', 'lucia.ferrini@acme.it', 'Operations', 2, 'Oversees logistics and supply chain coordination.', '2025-06-03'),
('Alessandro Greco', '349 27 34 562', 'agreco@gammaconsulting.it', 'Consultant', 7, 'Senior advisor on legal compliance and strategy.', '2025-06-03'),
('Matteo Serra', '349 27 34 563', 'm.serra@omega-srl.com', 'Sales Rep', 5, 'Follow-up contact for commercial offers.', '2025-06-03'),
('Elisa Marchetti', '349 27 34 564', 'emarchetti@nextgenmarketing.it', 'Marketing Lead', 6, 'Handles digital marketing campaigns and SEO.', '2025-06-03'),
('Gabriele Conti', '349 27 34 565', 'gabriele@nextgenmarketing.it', 'Copywriter', 6, 'Responsible for advertising content and blog writing.', '2025-06-03'),
('Matteo Galli', '349 27 34 566', 'matteogalli@libero.it', 'Account Manager', 9, 'Manages key client accounts in the retail sector.', '2025-06-04'),
('Leone Magni', '349 27 34 567', 'leonemagni@libero.it', 'Sales Executive', 7, 'Handles B2B sales and partnership development.', '2025-06-06'),
('Alessandro Terzi', '349 27 34 568', 'aleterzi@gmail.com', 'Technical Lead', 6, 'Leads backend development and infrastructure design.', '2025-06-06'),
('Alessandro Terzi', '349 27 34 569', 'seo@gmail.com', 'SEO Specialist', 9, 'Optimizes website content for search engine visibility.', '2025-06-06'),
('Alessandro Terzo', '349 27 34 570', 'test@gmail.com', 'Administrative Assistant', 8, 'Supports HR and finance with internal reporting.', '2025-06-09'),
('Danilo Longoni', '349 27 34 571', 'danilo1@gmail.com', 'CEO', 8, 'Founder and executive leader responsible for strategy.', '2025-06-09'),
('Clara Mauri', '349 27 34 572', 'claramauri@gmail.com', 'CEO', 6, 'Leads vision and growth initiatives for the company.', '2025-06-09'),
('Anna Altani', '349 27 34 573', 'annaaltani@gmail.com', 'Secretary', 8, 'Coordinates meetings, documents, and client calls.', '2025-06-10');

/* SELECT ALL FROM CONTACT */
SELECT * FROM CONTACT;

/* SELECT ALL DATABASES ON POSTGRESQL FOR SANITY CHECK */
SELECT datname, datallowconn, datacl FROM pg_database


/* VIEW OF CONTACTS + COMPANIES : USE ONLY FOR VIEWS */
CREATE OR REPLACE VIEW contacts_companies_view AS
SELECT
  c.id_contact,
  c.name,
  c.phone,
  c.email,
  c.role,
  c.company_id,
  co.name as company_name,
  co.email AS company_email,
  co.website AS website
FROM contact c
LEFT JOIN company co
  ON c.company_id = co.id_company
ORDER BY c.name;
  /* test the view */
  SELECT * FROM contacts_companies_view ORDER BY name;
  SELECT * FROM contacts_companies_view WHERE id_contact = 13;
  SELECT * FROM contacts_companies_view WHERE id_contact = $1; /* for dynamic research in the webapp only */


  /* VIEW OF COMPANIES : USE ONLY FOR VIEWS */
CREATE OR REPLACE VIEW companies_view AS
SELECT * FROM company;
/* test the view */
SELECT * FROM companies_view ORDER BY name;

