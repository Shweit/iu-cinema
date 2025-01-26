package com.shweit.cinema.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "hall")
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hallId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int totalSeats;

    @Column(nullable = false)
    private int totalRows;

    @Column(columnDefinition = "JSON")
    private String seatPlacement;

    @Column(columnDefinition = "JSON")
    private String bookedSeats;

}
