/* COMPANY TABLE */
SELECT * FROM company ORDER BY name;

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

/* ADD CHECK AMONG UPDATED TYPES */
ALTER TABLE company
ADD CONSTRAINT company_type_check
CHECK(company_type IN ('Client', 'Supplier', 'Prospect', 'Partner'));

  /* DANGER ZONE !DO NOT EXECUTE - OBSOLETE QUERY: 
    ADD CHECK AMONG PREDEFINED VALUES */
    SELECT DISTINCT company_type
    FROM company
    WHERE company_type NOT IN ('Supplier', 'Partner', 'Client', 'Prospect', 'Seller', 'Buyer', 'Assurance');

      /* IF YOU EXECUTE THE PREVIOUS QUERY, THEN ALTER TABLE AFOLLOWS */
      ALTER TABLE company DROP CONSTRAINT IF EXISTS company_type_check;

      ALTER TABLE company 
      ADD CONSTRAINT company_type_check
      CHECK(company_type IN ('Supplier', 'Partner', 'Client', 'Prospect', 'Seller', 'Buyer', 'Assurance'));

      /* FIX: MODIFY COMPANY TYPES */

      /* seller + assurance => supplier */
      UPDATE company
      SET company_type = 'Supplier'
      WHERE company_type IN ('Seller', 'Assurance');

      /* buyer => client */
      UPDATE company
      SET company_type = 'Client'
      where company_type IN ('Buyer');

      ALTER TABLE company
      DROP CONSTRAINT IF EXISTS company_type_check;

      ALTER TABLE company
      ADD CONSTRAINT company_type_check
      CHECK(company_type IN ('Client', 'Supplier', 'Prospect', 'Partner'));

      /* sanity check of the types */
      SELECT DISTINCT company_type FROM company ORDER BY company_type;

/* ---------*/

/* CONTACT TABLE */
CREATE TABLE IF NOT EXISTS contact (
  id_contact SERIAL PRIMARY KEY, /* SERIAL is an INTEGER */
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  role VARCHAR(100),
  company_id INTEGER REFERENCES company(id_company),
  details TEXT,
  created_at DATE DEFAULT CURRENT_DATE
);

/* CONFIGURE: ON DELETE OF THE COMPANY ID, SET IT TO 'NULL'*/
ALTER TABLE contact
ALTER COLUMN company_id DROP NOT NULL;

/* DROP THE FK OF 'COMPANY_ID' AND ADD IT AGAIN BUT WITH THE PROPERTY: 'ON DELETE SET NULL'*/
ALTER TABLE contact DROP CONSTRAINT contact_company_id_fkey;
ALTER TABLE contact
ADD CONSTRAINT contact_company_id_fkey
FOREIGN KEY (company_id)
REFERENCES company(id_company)
ON DELETE SET NULL;

/* LEFT JOIN */
SELECT contact.*, company.name AS company_name
FROM contact
LEFT JOIN company ON contact.company_id = company.id_company
ORDER BY contact.id_contact;

/* PUPULATE COMPANY TABLE */
INSERT INTO company (name, phone, email, website, company_type, notes, created_at) VALUES
('TechWorld S.p.A.', '02 45678901', 'info@techworld.it', 'www.techworld.it', 'Cliente', 'Cliente storico nel settore bancario, progetti continui su cloud e cybersecurity.', '2025-09-01 09:00:00'),
('GreenLife Solutions', '06 11223344', 'contatti@greenlifesol.it', 'www.greenlifesol.it', 'Prospect', 'Startup nel campo delle energie rinnovabili, potenziale cliente per sistemi ERP.', '2025-09-01 09:01:00'),
('BizAdvance Consulting', '011 22334455', 'info@bizadvance.it', 'www.bizadvance.it', 'Partner', 'Società partner su progetti di digitalizzazione e formazione HR.', '2025-09-01 09:02:00'),
('SmartChain SRL', '055 77889966', 'sales@smartchain.com', 'www.smartchain.com', 'Cliente', 'Azienda di logistica digitale, attiva su progetti di automazione magazzino.', '2025-09-01 09:03:00'),
('Innovo S.r.l.', '081 33445566', 'admin@innovo.it', 'www.innovo.it', 'Fornitore', 'Fornitore di soluzioni software verticali per settore sanitario.', '2025-09-01 09:04:00');

/* PUPULATE CONTACT TABLE */
INSERT INTO contact (name, surname, phone, email, role, company_id, details, created_at) VALUES
('Silvia', 'Romanelli', '328 1234567', 's.romano@techworld.it', 'IT Manager', 1, 'Gestisce i progetti di infrastruttura cloud e sicurezza. Referente principale per le soluzioni enterprise.', '2025-09-01'),
('Andrea', 'Greco', '347 9876543', 'a.greco@greenlifesol.it', 'Responsabile Acquisti', 2, 'Si occupa della selezione di fornitori tecnologici e trattative commerciali.', '2025-09-01'),
('Laura', 'Ferrari', '334 3344556', 'l.ferrari@bizadvance.it', 'Consulente HR', 3, 'Supporta i clienti nei progetti di digitalizzazione HR, onboarding e formazione.', '2025-09-01'),
('Roberto', 'Galli', '340 2233445', 'r.galli@smartchain.com', 'Sales Executive', 4, 'Responsabile delle trattative per progetti IT logistici e CRM. Coordina il team sales.', '2025-09-01'),
('Martina', 'Rossi', '345 6677889', 'm.rossi@innovo.it', 'Account Manager', 5, 'Gestisce i rapporti commerciali e segue la personalizzazione dei software forniti.', '2025-09-01'),
('Giovanni', 'Conti', '333 2244668', 'g.conti@techworld.it', 'Specialista Cybersecurity', 1, 'Collabora su progetti di audit e implementazione policy di sicurezza. Relatore in eventi marketing.', '2025-09-02'),
('Valeria', 'Sanna', '392 4455667', 'v.sanna@greenlifesol.it', 'Marketing Manager', 2, 'Gestisce campagne digitali e relazioni con aziende partner. Interessata a servizi CRM.', '2025-09-02'),
('Luca', 'Marchetti', '366 8899001', 'l.marchetti@bizadvance.it', 'Formatore', 3, 'Eroga corsi su soft skills e strumenti HR digitali per clienti aziendali.', '2025-09-02'),
('Claudio', 'De Luca', '340 5566778', 'c.deluca@smartchain.com', 'HR Manager', 4, 'Responsabile della selezione IT, coordina piani di formazione tecnica interna.', '2025-09-02'),
('Elena', 'Grassi', '335 7788990', 'elena.grassi@innovo.it', 'Specialista prodotto', 5, 'Segue le implementazioni software e formazione clienti finali nel settore sanitario.', '2025-09-02');

/* ALTER CONTACT TABLE AND ADD THE COLUMN: "SURNAME" AS A STRING FIELD*/
/*ALTER TABLE contact
ADD surname VARCHAR(255);*/

/* UPDATE THE EXISTING RECORDS BY SETTING A SURNAME FOR THEM */
/*UPDATE contact
SET name = 'Valeria', surname = 'Sanna'
WHERE id_contact = 59
RETURNING *;*/


/* SELECT ALL FROM CONTACT */
SELECT * FROM contact ORDER BY name;

/* SELECT ALL DATABASES ON POSTGRESQL FOR SANITY CHECK */
SELECT datname, datallowconn, datacl FROM pg_database

/* VIEW OF CONTACTS + COMPANIES : USE ONLY FOR VIEWS */
DROP VIEW contacts_companies_view;
CREATE VIEW contacts_companies_view AS
SELECT
  c.id_contact,
  c.name,
  c.surname,
  c.phone,
  c.email,
  c.role,
  c.company_id,
  c.details,
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


/* PROJECTS TABLE */
SELECT * FROM projects;

CREATE TABLE projects (
  id_project SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  company_id INTEGER REFERENCES company(id_company),
  status VARCHAR(50) DEFAULT 'Attivo',
  start_date DATE,
  end_date DATE,
  budget NUMERIC(12,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE projects
ADD CONSTRAINT status_check
CHECK (status IN ('Attivo', 'Chiuso', 'In attesa', 'Perso'));

ALTER TABLE projects DROP CONSTRAINT projects_company_id_fkey;
ALTER TABLE projects
ADD CONSTRAINT projects_company_id_fkey
FOREIGN KEY (company_id)
REFERENCES company(id_company)
ON DELETE SET NULL;

/* LEFT JOIN ON PROJECTS AND COMPANY TABLES*/
SELECT projects.*, company.name AS company_name
FROM projects
LEFT JOIN company ON projects.company_id = company.id_company
ORDER BY projects.id_project

/* CREATE projects_view */
CREATE OR REPLACE VIEW projects_view AS
SELECT projects.*, company.name as company_name 
FROM projects
LEFT JOIN company ON company_id = company.id_company
/* TEST THE PROJECTS VIEW */
SELECT * FROM projects_view
ORDER BY NAME;

INSERT INTO projects (name, description, company_id, status, start_date, end_date, budget) VALUES
('Migrazione Infrastruttura Cloud', 'Progetto di trasferimento dei servizi bancari di TechWorld S.p.A. su infrastruttura AWS con implementazione di misure avanzate di sicurezza.', 21, 'Attivo', '2025-09-05', NULL, 32000),
('Implementazione ERP Green', 'Sviluppo e integrazione di una piattaforma ERP personalizzata per la gestione clienti e processi interni di GreenLife Solutions.', 22, 'In attesa', '2025-09-10', NULL, 18000),
('Academy HR Digitale', 'Percorso formativo completo per il personale HR dei clienti BizAdvance Consulting per adozione di nuovi strumenti digitali.', 23, 'Chiuso', '2025-06-15', '2025-08-30', 9000),
('Automazione Magazzino', 'Progetto per la digitalizzazione e automazione dei processi di logistica presso SmartChain SRL, con dashboard di monitoraggio in tempo reale.', 24, 'Attivo', '2025-08-20', NULL, 25000);

/*
  DANGER ZONE - DROP TABLES HERE!
  DROP TABLE company;
  DROP TABLE contact;
  DROP TABLE projects;
*/

