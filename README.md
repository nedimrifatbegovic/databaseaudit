# databaseaudit
Masterthesis - Database Audit Prototype

- Author: Nedim Rifatbegovic
- University of Vienna 
- Menthor: Univ.-Prof. Dipl.-Ing. Dr. Dr.Gerald Quirchmayr

> Short description of the Application 

My goal with this master thesis is to develop a model and implement a prototype that would automatically audit relational databases in companies, and generate reports and verification for internal audits, but also external auditors. In my experience working as an IT auditor, I noticed that there is not much focus on auditing databases. There are many information security standards and certificates, but as my guiding line for the master thesis, I have chosen the COBIT (Control Objectives for Information and Related Technologies) framework, created by ISACA (Information Systems Audit and Control Association), which is one of the most widely spread standards in the world. I have also done multiple IT audits following the COBIT 4.1 [1] and 5 frameworks. After discussing this topic with some CISA (Certified Information Systems Auditor) certified auditors, it came to my knowledge that there is an interest in this type of systems and that the main focus of IT auditors has been auditing the application layer in companies, but the database auditing is growing more important with each year. 
This prototype will be able to detect possible threats on the database level and avoid external threats. This prototype will be for two different types of users, for internal and external auditors. Internal auditors will have the possibility to generate daily/weekly/monthly audits. The reports will be saved and can be compared by internal auditors. The big benefit for external auditors is that the report and the needed evidence/files, that are needed for the IT audit, will be generated automatically. For example, tickets from the company’s ticket system, where the tasks are being documented, a table with balanced scorecards – where the potential risks are shown, documentation on the potential risks in the company’s database, etc. I have chosen relational databases because, in my experience, they have been most used in the companies I audited. According to the COBIT standard, there are seven characteristics of information that are important for the final analysis of an IT audit. Those are availability, integrity, compliance, reliability, efficiency, effectiveness, and confidentiality. With this prototype, all of them, except efficiency and effectiveness, can be proven. The prototype will ensure that multiple COBIT control objectives are fulfilled, and the potential threats detected. Since COBIT is a global standard, many other certificates are leaning on its control objectives. With fulfilling COBIT other certificates are also fulfilled in some points, like for example the ISO 27000 standard or the ISAE 3402 certificate.
To achieve this, a prototype will be developed. The architecture of the prototype will consist of a backend where the control objectives, which are defined by COBIT, and other ISACA best practices, will be controlled and where the proof will be collected. The controls that this application will cover are: 
-	Checking if the database is running on a supported database software version
-	Checking if there is an established data classification scheme based on the criticality and sensitivity of the enterprise data – check if user groups are defined (COBIT PO2.3)
o	Checking if the principal of least privilege is implemented (Review user rights and ensure if their access rights are appropriate)
-	Searching for users with DBA (database administrator) privileges
-	Checking the password policy (EU Standard, COBIT DS5)
-	Checking if unexpected interruptions in data processing are being handled (COBIT AC4)
-	Checking the integrity of data stored in the database (COBIT PO2.4)
-	Checking if procedures for backup and restoration of the database have been implemented, followed, and documented (COBIT DS11.5)
-	Checking if changes are following a defined process and if they are being documented (COBIT AI6.1, AI6.2)
The deployment diagram in the following illustration shows how the application will structurally look like [G1]. 
 
G1: Deployment Diagram
The backend will be written in TypeScript, using TypeORM as ORM mapper for the database. To do this a config file has to be filled out by the company’s admin, where the application will get the needed credentials to connect to the company’s database and ticket system. The frontend will be created using React and TypeScript, with a responsive UI, and focus on a good and simple UX. The user story of this prototype starts with adding the internal and external auditors to the prototype. The registration is done by the prototype administrator. There will be three different types of users. The first one is the administrator of the prototype, which can add or remove users (auditors) from the system. The second user will be the company / internal auditor. The internal user will have the list of external auditors that have been requested, where he can accept or decline a specific auditor request (the external auditors which have not been accepted or declined by the internal auditor will be shown as pending in his list). This way, after the audit is done, he can easily disable the external auditor, until the next audit is due. The internal auditor can also start a new audit and generate a new report. He can also see the list of the previous audits and compare the reports. The third user is an external auditor. He can connect to clients by inserting the company’s id (he will get the company id – for example, provided by email from the client). The external auditor can also open the list of all his clients. He can open the details of a client, where he will see the previous audits or start a new one. If he chooses an old audit, he will also have the possibility to download the report or download the needed proof as a zip file. The result of this process will be a fast database audit. In the end, both sides will have the reports, which will be rated by using balanced scorecards. The use case diagram in the following illustration is showing the three different types of users and the different use cases in which these users are involved in and how they will interact with the system [G2]. 
 
G2: Use Case Diagram showing the interaction between the users and the use cases
To test these functionalities a database will be created inside a Windows 10 virtual machine and filled with example data. Also, a ticket system will be created and filled with data related to the database.   
The expected impact of this master thesis is improved security in companies through a bigger focus on auditing databases. Many breaches on the database level can be avoided if the possible risk factors are discovered on time. As described by ISACA [2], over 70% of the data breaches are caused by external sources, but still, there are breaches (20% - insiders, 32% business partners) caused also by insiders and business partners. According to [2], the top vulnerability that has been exploited is unauthorized access via default accounts. The average total cost per incident has been around 6.65 million dollars. Many of these breaches can be easily avoided by regular audits and following the COBIT controls.
 
Sources: 
[1] COBIT 4.1. Link: https://www.bauer.uh.edu/parks/cobit_4.1.pdf, Last Visited: 27.09.2020
[2] ISACA – Database Security & Auditing, Jeff Paddock. Link: http://www.isaca-denver.org/Chapter-Resources/Database_Security_and_Auditing.pdf, Last Visited: 27.09.2020 
Graphs: 
[G1] – Deployment Diagram
[G2] – Use Case Diagram showing the interaction between the users and the use cases


> Backend - TypeScript & TypeORM

Backend is written in with TypeScript using TypeORM as ORM mapper. APIs are created needed for the communication with the Atlassian Jira, but also for the communication with the Frontend.

> Frontend - React & TypeScript

The frontend is created using React and TypeScript. And is showing the three different use cases, which have been mentioned before. 
