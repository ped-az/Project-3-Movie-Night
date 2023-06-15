-- Table: public.movies_2

-- DROP TABLE IF EXISTS public.movies_2;

CREATE TABLE IF NOT EXISTS public.movies_2
(
    series_title varchar(75),
    released_year integer,
    certificate varchar(8),
    runtime varchar(15),
    genre_1 varchar(15),
    genre_2 varchar(15),
    genre_3 varchar(15),
    imdb_rating numeric(2,1),
    overview varchar(340),
    meta_score integer,
    director varchar(40),
    star1 varchar(40),
    star2 varchar(40),
    star3 varchar(40),
    star4 varchar(40),
    no_of_votes integer,
    gross integer,
    poster_link varchar(500),
    CONSTRAINT movies_2_pkey PRIMARY KEY (series_title)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.movies_2
    OWNER to postgres;
	
	
select * from movies_3;