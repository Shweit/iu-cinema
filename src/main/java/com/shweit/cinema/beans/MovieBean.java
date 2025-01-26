package com.shweit.cinema.beans;

import com.shweit.HibernateUtil;
import com.shweit.cinema.model.Movie;
import org.hibernate.Session;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import java.util.List;

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
}
