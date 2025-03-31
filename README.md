# Cinema Booking System – JSF Web Application

This project is the main web application developed as part of the coursework for the *Programming Web Applications* module (Winter Semester 2024/25). It enables users to view available screenings and reserve cinema tickets via a web interface.

## 🎯 Purpose

The application was developed following the MVC pattern using **JavaServer Faces (JSF)** for the view layer and **Hibernate** for persistence. It demonstrates a complete flow from UI interaction to database persistence, fulfilling all core requirements of the university assignment.

## 🛠 Technologies Used

- **Java 8**
- **Jakarta EE / Java EE**
- **JSF (JavaServer Faces)**
- **Hibernate ORM**
- **MySQL**
- **Bootstrap** (for styling)
- **NetBeans** (project structure and deployment)

## ✨ Features

- Object-oriented domain model with entities like:
  - `Movie`
  - `Ticket`
  - `Hall`
- Integration with MySQL using Hibernate (via `hibernate.cfg.xml`)
- Views created with JSF and Facelets (`*.xhtml`)
- User input validation on the form (e.g. reservation process)
- Fully functional booking process with form submission and feedback
- Simple but responsive user interface using Bootstrap


## 🖥️ How to Run

1. Import the project into **NetBeans** as a Maven project.
2. Set up a MySQL database and update the `hibernate.cfg.xml` accordingly.
3. Make sure all required libraries (Hibernate, JSF, MySQL) are resolved.
4. Run the project on a supported application server (e.g., GlassFish 5.0.1).
5. Access the web application at `http://localhost:8080/iu-cinema/`.

## 💾 Database Schema

The database is created based on the domain model. An SQL script was included as part of the coursework. You can find it [here](https://github.com/Shweit/iu-cinema/blob/master/src/main/resources/sql/script.sql)

## 📄 License

This project was created for academic purposes as part of a university assignment and is not intended for commercial use.

---

**Author:** Dennis van den Brock  
**Course:** Programming Web Applications (DSPWA102201)  
**Instructor:** Christoph Schopp  
**Submission Deadline:** March 31, 2025
