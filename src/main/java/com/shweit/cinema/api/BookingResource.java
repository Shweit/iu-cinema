package com.shweit.cinema.api;

import com.shweit.cinema.model.Hall;
import com.shweit.cinema.model.Movie;
import com.shweit.cinema.model.Ticket;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.hibernate.Session;
import org.hibernate.Query;
import com.shweit.HibernateUtil;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Path("/api/bookings")
public class BookingResource {

    @GET
    @Path("/movie/{movieId}/showtimes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMovieShowtimes(@PathParam("movieId") int movieId) {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            Movie movie = (Movie) session.get(Movie.class, movieId);
            if (movie == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity("Movie not found")
                    .build();
            }
            
            ObjectMapper mapper = new ObjectMapper();
            List<String> showtimes = mapper.readValue(movie.getBroadcastingTimes(), new TypeReference<List<String>>() {});
            
            Map<String, Object> result = new HashMap<>();
            result.put("showtimes", showtimes);
            result.put("hallId", movie.getHall().getHallId());
            
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error retrieving showtimes")
                .build();
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }

    @GET
    @Path("/movie/{movieId}/time/{time}/seats")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getShowtimeSeats(@PathParam("movieId") int movieId, @PathParam("time") String time) {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            String hql = "FROM Ticket t WHERE t.movie.movieId = :movieId AND t.broadcastTime = :time";
            Query query = session.createQuery(hql);
            query.setParameter("movieId", movieId);
            query.setParameter("time", java.sql.Time.valueOf(time));
            List<Ticket> tickets = query.list();
            
            List<Map<String, Object>> occupiedSeats = new ArrayList<>();
            for (Ticket ticket : tickets) {
                Map<String, Object> seatInfo = new HashMap<>();
                seatInfo.put("ticketId", ticket.getTicketId());
                seatInfo.put("firstName", ticket.getFirstName());
                seatInfo.put("lastName", ticket.getLastName());
                occupiedSeats.add(seatInfo);
            }
            
            return Response.ok(occupiedSeats).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error retrieving occupied seats")
                .build();
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }

    @GET
    @Path("/hall/{hallId}/seats")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHallSeats(@PathParam("hallId") int hallId) {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            Hall hall = (Hall) session.get(Hall.class, hallId);
            if (hall == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity("Hall not found")
                    .build();
            }
            
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> seatPlacement = mapper.readValue(hall.getSeatPlacement(), new TypeReference<Map<String, Object>>() {});
            
            return Response.ok(seatPlacement).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error retrieving hall seats")
                .build();
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }

    @GET
    @Path("/hall/{hallId}/booked-seats")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookedSeats(@PathParam("hallId") int hallId) {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            Hall hall = (Hall) session.get(Hall.class, hallId);
            if (hall == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity("Hall not found")
                    .build();
            }
            
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Boolean> bookedSeats = mapper.readValue(hall.getBookedSeats(), new TypeReference<Map<String, Boolean>>() {});
            
            return Response.ok(bookedSeats).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error retrieving booked seats")
                .build();
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }
}