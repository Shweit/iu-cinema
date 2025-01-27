package com.shweit.cinema.beans;

import com.shweit.HibernateUtil;
import com.shweit.cinema.model.Movie;
import com.shweit.cinema.model.Ticket;

import org.hibernate.Session;
import javax.enterprise.context.RequestScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.faces.context.FacesContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

@ManagedBean
@RequestScoped
public class BookingBean implements Serializable {
    private int movieId;
    private Movie movie;
    
    @PostConstruct
    public void init() {
        // Get movieId from request parameter if available
        String movieIdParam = FacesContext.getCurrentInstance()
            .getExternalContext()
            .getRequestParameterMap()
            .get("movieId");
        
        if (movieIdParam != null && !movieIdParam.isEmpty()) {
            try {
                this.movieId = Integer.parseInt(movieIdParam);
            } catch (NumberFormatException e) {
                // Handle invalid movieId
                System.err.println("Invalid movieId: " + movieIdParam);
            }
        }
    }
    
    public List<String> getMovieShowtimes() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        System.out.println("movieId: " + movieId);

        Movie movie = (Movie) session.get(Movie.class, movieId);
        if (movie == null) {
            return new ArrayList<>();
        }

        ObjectMapper mapper = new ObjectMapper();
        try {
            // JSON-String in eine Liste von Strings konvertieren
            return mapper.readValue(movie.getBroadcastingTimes(), new TypeReference<List<String>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>(); // Leere Liste bei Fehler zurückgeben
        }
    }


    public String getMovieName() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Movie movie = (Movie) session.get(Movie.class, movieId);

        return movie != null ? movie.getName() : "Film nicht gefunden";
    }

    public Movie getMovie() {
        if (this.movie != null) {
            return this.movie;
        }

        Session session = HibernateUtil.getSessionFactory().openSession();
        this.movie = (Movie) session.get(Movie.class, movieId);

        return this.movie;
    }

    public ArrayList<String> getBookedSeatsForShowtime(String showtime) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        ArrayList<String> bookedSeats = new ArrayList<>();

        try {
            String hql = "FROM Ticket t WHERE t.movie.id = :movieId AND t.showtime = :showtime";
            List<Ticket> tickets = session.createQuery(hql)
                .setParameter("movieId", movieId)
                .setParameter("showtime", showtime)
                .list();

            for (Ticket ticket : tickets) {
                bookedSeats.add(ticket.getSeatNumber());
            }
        } finally {
            session.close();
        }

        return bookedSeats;
    }
}