package com.shweit.cinema.beans;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.type.TypeReference;
import com.shweit.cinema.HibernateUtil;
import com.shweit.cinema.model.Billing;
import com.shweit.cinema.model.Movie;
import com.shweit.cinema.model.Ticket;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;

@ManagedBean
@RequestScoped
public class PaymentBean {
    // Billing information
    private int movieId;
    private String firstName;
    private String lastName;
    private String email;
    private String street;
    private String houseNumber;
    private String zipCode;
    private String city;
    private String paymentMethod = "paypal"; // Default payment method
    
    // Payment method specific fields
    private String iban;
    private String bic;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    
    // Hidden fields for ticket information
    private float total;
    private String ticketHoldersData; // JSON string from form
    
    @PostConstruct
    public void init() {
        // First try to get movieId from request parameter
        String movieIdParam = FacesContext.getCurrentInstance()
            .getExternalContext()
            .getRequestParameterMap()
            .get("movieId");
        
        if (movieIdParam != null) {
            try {
                this.movieId = Integer.parseInt(movieIdParam);
            } catch (NumberFormatException e) {
                System.err.println("Invalid movieId: " + movieIdParam);
            }
        }
    }

    // Getters and setters for all fields
    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getStreet() {
        return street;
    }
    
    public void setStreet(String street) {
        this.street = street;
    }
    
    public String getHouseNumber() {
        return houseNumber;
    }
    
    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
    
    public String getZipCode() {
        return zipCode;
    }
    
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public String getIban() {
        return iban;
    }
    
    public void setIban(String iban) {
        this.iban = iban;
    }
    
    public String getBic() {
        return bic;
    }
    
    public void setBic(String bic) {
        this.bic = bic;
    }
    
    public String getCardNumber() {
        return cardNumber;
    }
    
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public String getExpiryDate() {
        return expiryDate;
    }
    
    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public String getCvv() {
        return cvv;
    }
    
    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
    
    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }
    
    public String getTicketHoldersData() {
        return ticketHoldersData;
    }
    
    public void setTicketHoldersData(String ticketHoldersData) {
        this.ticketHoldersData = ticketHoldersData;
    }
    
    public String submit() {
        System.out.println(
            "TRANSACTION SUBMITTED: " +
            "Movie ID: " + movieId +
            ", First Name: " + firstName +
            ", Last Name: " + lastName +
            ", Payment Method: " + paymentMethod
        );
        
        try {
            // Get ticket holders from JavaScript
            if (this.getTicketHoldersData() == null || this.getTicketHoldersData().isEmpty()) {
                System.out.println("TicketHoldersData is null or empty" + this.getTicketHoldersData());

                FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Es wurden keine Ticketinhaber gefunden", null)
                );
                return "/payment.xhtml?faces-redirect=true&movieId=" + movieId;
            }
            
            ObjectMapper mapper = new ObjectMapper();
            JsonNode ticketHoldersNode = mapper.readTree(this.getTicketHoldersData());
            
            // Create transaction details based on payment method
            Map<String, String> transactionDetails = new HashMap<>();
            if ("sepa".equals(paymentMethod)) {
                transactionDetails.put("iban", iban);
                transactionDetails.put("bic", bic);
            } else if ("creditCard".equals(paymentMethod)) {
                transactionDetails.put("cardNumber", cardNumber);
                transactionDetails.put("expiryDate", expiryDate);
                transactionDetails.put("cvv", cvv);
            }
            
            // Create Billing entity
            Billing billing = new Billing();
            billing.setFirstName(firstName);
            billing.setLastName(lastName);
            billing.setStreet(street);
            billing.setHouseNumber(houseNumber);
            billing.setZip(zipCode);
            billing.setCity(city);
            billing.setPaymentInfo(paymentMethod);
            billing.setTransactionDetails(mapper.writeValueAsString(transactionDetails));
            
            // Start Hibernate session
            Session session = HibernateUtil.getSessionFactory().openSession();
            Transaction transaction = session.beginTransaction();
            
            // Save billing information
            session.save(billing);

            try {
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
                    
                    JsonNode seatNode = holder.get("seat");
                    ticket.setSeatNumber(formatSeatNumber(seatNode));
                    
                    // Get price directly as float
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
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error processing payment", null)
                );
                return "/payment.xhtml?faces-redirect=true&movieId=" + movieId;
            } finally {
                session.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
            FacesContext.getCurrentInstance().addMessage(null,
                new FacesMessage(FacesMessage.SEVERITY_ERROR, "Fehler beim verarbeiten der Daten. Bitte versuche es später erneut", null));
            return "/payment.xhtml?faces-redirect=true&movieId=" + movieId;
        }
    }

    private String formatSeatNumber(JsonNode seatNode) {
        int row = seatNode.get("row").asInt();
        int seat = seatNode.get("seat").asInt();
        return String.format("%02d:%02d", row, seat);
    }
}
