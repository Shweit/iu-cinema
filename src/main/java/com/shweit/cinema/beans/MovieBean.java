package com.shweit.cinema.beans;

import com.shweit.HibernateUtil;
import com.shweit.cinema.model.Movie;
import java.io.IOException;
import org.hibernate.Session;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;

@ManagedBean
@RequestScoped
public class MovieBean {

    public List<Movie> getAllMovies() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        List<Movie> movies = session.createCriteria(Movie.class).list();

        session.getTransaction().commit();
        session.close();

        return movies;
    }
    
    public List<String> getGenres(Movie movie) {
        // Null-Prüfung für das `movie`-Objekt und `movie.getGenre()`
        if (movie == null || movie.getGenre() == null || movie.getGenre().isEmpty()) {
            return new ArrayList<>(); // Leere Liste zurückgeben
        }

        ObjectMapper mapper = new ObjectMapper();
        try {
            // JSON-String in eine Liste von Strings konvertieren
            return mapper.readValue(movie.getGenre(), new TypeReference<List<String>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>(); // Leere Liste bei Fehler zurückgeben
        }
    }
    
    // Return an comma seperated String with all top Casts
    public String getTopCast(Movie movie) {
        // Check if movie object or topCast is null or empty
        if (movie == null || movie.getTopCast() == null || movie.getTopCast().isEmpty()) {
            return "";
        }

        ObjectMapper mapper = new ObjectMapper();
        try {
            // Convert JSON string to List of Strings
            List<String> castList = mapper.readValue(movie.getTopCast(), new TypeReference<List<String>>() {});
            // Join the cast list with commas
            return String.join(", ", castList);
        } catch (IOException e) {
            e.printStackTrace();
            return ""; // Return empty string in case of error
        }
    }
}
