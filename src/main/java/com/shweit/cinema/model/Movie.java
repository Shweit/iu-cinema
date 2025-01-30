package com.shweit.cinema.model;

import lombok.Data;
import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Data
@Entity
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movieId;

    @Column(nullable = false)
    private String name;

    @Column(name = "short_desc", columnDefinition = "TEXT")
    private String shortDesc;
    
    private String cover;

    @Column(columnDefinition = "TEXT")
    private String desc;

    private Time playtime;

    private Date releaseDate;

    @Column(columnDefinition = "JSON")
    private String broadcastingTimes;

    @Column(columnDefinition = "JSON")
    private String topCast;

    private String trailerUrl;

    private String director;

    @Column(columnDefinition = "JSON")
    private String genre;

    private float rating;

    private float price;

    @ManyToOne
    @JoinColumn(name = "hallId", nullable = false)
    private Hall hall;
}
