import csv
import pandas as pd
from sqlalchemy import create_engine
import sqlite3
from flask import Flask, render_template, jsonify
from sqlalchemy.orm import Session 


data = pd.read_csv('imdb_top_1000.csv')

engine= create_engine('sqlite:///movies.db')

data.to_sql('movies',engine,index=False,if_exists= 'replace')

session = Session(engine)


################################################
# Flask Setup
################################################
app = Flask(__name__)


# SQLite database connection
conn = sqlite3.connect('movies.db', check_same_thread=False)
cursor = conn.cursor()



# # Read the CSV file and insert data into the database
# with open('imdb_top_1000.csv', 'r') as file:
#     csv_data = csv.DictReader(file)
    

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/movies')
def get_movies():
    cursor.execute("SELECT * FROM movies")
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    result = [dict(zip(columns, row)) for row in rows]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)





#



#     #Create session link from python to DB
#     session = Session(engine)

#     """Return a JSON list of stations."""
#     # Perform the query to retrieve the list of stations
#     results = session.query(stations.station).all()

#     session.close()

#     # Convert the query results to a list
#     station_list = list(np.ravel(results))

#     return jsonify(station_list)

# # Define the temperature observations route
# @app.route("/api/v1.0/tobs")
# def tobs():
    
#     #Create a session link from Python to DB
#     session = Session(engine)

#     #Define most active station by ID in measurement table
#     most_active_st = Session.query(measurement.station).group_by(measurement.station)\
#     .order_by(func.count().desc())\
#     .first()

#     #define most recent date in data set
#     recent_date =  Session.query(measurement.date).order_by(measurement.date.desc()).first()

#     results = Session.query(measurement.date, measurement.tobs)\
#         .filter(measurement.station == most_active_st[0])\
#         .filter(func.strftime("%Y-%m-%d", measurement.date) >= recent_date - dt.timedelta(days=365))\
#         .all()

#     session.close()

# #Return Jsonify list of temp observations for the previous year
#     tobs_list = []
#     for date, tobs in results:
#             tobs_dict = {}
#             tobs_dict["Date"] = date 
#             tobs_dict["Temperature Obs"]= tobs
#             tobs_list.append(tobs_dict)
#     return jsonify(tobs_list)
   
# # Define the temperature statistics route for a given start date
# @app.route("/api/v1.0/<start>")
# def temperature_stats_start(start):
#     # Create session link from Python to the DB
#     session = Session(engine)

#     """Return a JSON list of the minimum temperature, average temperature, and maximum temperature
#        for all the dates greater than or equal to the start date."""
#     # Query temperature statistics for the given start date
#     results = session.query(func.min(measurement.tobs), func.avg(measurement.tobs), func.max(measurement.tobs))\
#         .filter(measurement.date >= start)\
#         .all()

#     session.close()

#     # Create a dictionary to store the temperature statistics
#     temperature_stats = {
#         "Start Date": start,
#         "TMIN": results[0][0],
#         "TAVG": results[0][1],
#         "TMAX": results[0][2]
#     }

#     return jsonify(temperature_stats)

# # Define the temperature statistics route for a given start and end date
# @app.route("/api/v1.0/<start>/<end>")
# def temperature_stats_range(start, end):
#     # Create session link from Python to the DB
#     session = Session(engine)

#     """Return a JSON list of the minimum temperature, average temperature, and maximum temperature
#        for the dates from the start date to the end date, inclusive."""
#     # Query temperature statistics for the given date range
#     results = session.query(func.min(measurement.tobs), func.avg(measurement.tobs), func.max(measurement.tobs))\
#         .filter(measurement.date >= start)\
#         .filter(measurement.date <= end)\
#         .all()

#     session.close()

#     # Create a dictionary to store the temperature statistics
#     temperature_stats = {
#         "Start Date": start,
#         "End Date": end,
#         "TMIN": results[0][0],
#         "TAVG": results[0][1],
#         "TMAX": results[0][2]
#     }

#     return jsonify(temperature_stats)

# if __name__ == "__main__":
#     app.run(debug=True)

# #TABLE JOIN IF NEEDED 
# from sqlalchemy import create_engine, Column, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, relationship

# # Create the SQLAlchemy engine
# engine = create_engine('your_database_connection_string')

# # Create a session
# Session = sessionmaker(bind=engine)
# session = Session()

# # Create a base class for declarative models
# Base = declarative_base()

# # Define the "station" table model
# class Station(Base):
#     __tablename__ = 'station'
#     id = Column(Integer, primary_key=True)
#     station = Column(String)
#     # ... other columns in the station table

# # Define the "measurement" table model
# class Measurement(Base):
#     __tablename__ = 'measurement'
#     id = Column(Integer, primary_key=True)
#     station = Column(String)
#     # ... other columns in the measurement table

#     # Establish a relationship with the Station table
#     station_data = relationship("Station", backref="measurements")

# # Query and join the tables based on the common column "station"
# query = session.query(Measurement).join(Station, Measurement.station == Station.station)

# # Retrieve the joined data
# results = query.all()

# # Process the joined data as per your requirements
# for measurement in results:
#     print(f"Measurement ID: {measurement.station}")
#     print(f"Station Name: {measurement.station_data.station}")
#     # ... other fields from the measurement and station tables

# # Close the session
# session.close()
