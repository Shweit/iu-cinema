package com.shweit.cinema.beans;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shweit.HibernateUtil;
import com.shweit.cinema.model.Billing;
import com.shweit.cinema.model.Hall;
import com.shweit.cinema.model.Movie;
import com.shweit.cinema.model.Ticket;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import java.sql.Date;
import java.sql.Timestamp;

@ManagedBean
@RequestScoped
public class PaymentBean {
    private int movieId;
    private float total;
    private String ticketHolders;
    private String billingInfo;

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getTicketHolders() {
        return ticketHolders;
    }

    public void setTicketHolders(String ticketHolders) {
        this.ticketHolders = ticketHolders;
    }

    public String getBillingInfo() {
        return billingInfo;
    }

    public void setBillingInfo(String billingInfo) {
        this.billingInfo = billingInfo;
    }

    public String submit() {
        System.out.println(
            "TRANSACTION SUBMITTED: " +
            "Movie ID: " + movieId +
            ", Total: " + total +
            ", Ticket Holders: " + ticketHolders +
            ", Billing Info: " + billingInfo
        );
        
        try {
            // Parse JSON data
            ObjectMapper mapper = new ObjectMapper();
            JsonNode ticketHoldersNode = mapper.readTree(ticketHolders);
            JsonNode billingInfoNode = mapper.readTree(billingInfo);

            // Create Billing entity
            Billing billing = new Billing();
            billing.setFirstName(billingInfoNode.get("firstName").asText());
            billing.setLastName(billingInfoNode.get("lastName").asText());
            billing.setStreet(billingInfoNode.get("street").asText());
            billing.setHouseNumber(billingInfoNode.get("houseNumber").asText());
            billing.setZip(billingInfoNode.get("zipCode").asText());
            billing.setCity(billingInfoNode.get("city").asText());
            billing.setPaymentInfo(billingInfoNode.get("paymentMethod").asText());
            billing.setTransactionDetails(mapper.writeValueAsString(billingInfoNode));

            // Start Hibernate session
            Session session = HibernateUtil.getSessionFactory().openSession();
            Transaction transaction = session.beginTransaction();

            try {
                // Save billing information
                session.save(billing);

                // Get movie reference
                Movie movie = (Movie) session.get(Movie.class, movieId);
                if (movie == null) {
                    throw new RuntimeException("Movie not found");
                }

                // Create tickets for each ticket holder
                for (JsonNode holder : ticketHoldersNode) {
                    Ticket ticket = new Ticket();
                    ticket.setFirstName(holder.get("firstName").asText());
                    ticket.setLastName(holder.get("lastName").asText());
                    ticket.setShowtime(holder.get("showtime").asText());
                    ticket.setSeatNumber(formatSeatNumber(holder.get("seat")));
                    ticket.setPrice((float) holder.get("price").asDouble());
                    ticket.setTicketNumber(holder.get("ticketNumber").asText());
                    ticket.setPurchaseDate(new Timestamp(System.currentTimeMillis()));
                    ticket.setHall(movie.getHall());
                    ticket.setMovie(movie);
                    ticket.setBilling(billing);

                    session.save(ticket);
                }

                transaction.commit();
                return "/confirmation.xhtml?faces-redirect=true&billingId=" + billing.getBillingId();

            } catch (Exception e) {
                if (transaction != null) {
                    transaction.rollback();
                }
                e.printStackTrace();
                FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error processing payment", null));
                return null;
            } finally {
                session.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            FacesContext.getCurrentInstance().addMessage(null,
                new FacesMessage(FacesMessage.SEVERITY_ERROR, "Invalid data format", null));
            return null;
        }
    }

    private String formatSeatNumber(JsonNode seatNumber) {
        int row = seatNumber.get("row").asInt();
        int seat = seatNumber.get("seat").asInt();
        return String.format("%02d:%02d", row, seat);
    }
}
