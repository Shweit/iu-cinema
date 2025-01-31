package com.shweit.cinema.model;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.*;

@Data
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketId;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false)
    private String showtime;

    @Column(nullable = false)
    private String seatNumber;

    @Column(nullable = false)
    private String ticketNumber;

    @Column(nullable = false)
    private float price;

    @Column(nullable = false)
    private Timestamp purchaseDate;

    @ManyToOne
    @JoinColumn(name = "movieId", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "hallId", nullable = false)
    private Hall hall;

    @ManyToOne
    @JoinColumn(name = "billingId", nullable = false)
    private Billing billing;
}
