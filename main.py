import sqlite3
db = sqlite3.connect('movies.db')
cursor = db.cursor()
cursor.execute('SELECT * FROM movies')
for row in cursor:
    print('{0} {1} {2}'.format(row[1], row[2], row[3]))

def find_movie(name):
    global cursor
    cursor.execute(f"SELECT * FROM movies WHERE title LIKE '%{name}%' OR actors LIKE '%{name}%'")
    for row in cursor:
        print('{0} {1} {2}'.format(row[1], row[2], row[3]))

print('--- movie search')

find_movie("Indi")
find_movie("Connery")
find_movie("Mat")

db.close()
