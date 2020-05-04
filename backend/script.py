from flask import Flask, request, abort, jsonify, make_response
from flask_mysqldb import MySQL
from flask_cors import CORS
import json

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'admin.cf5cfxkzhnoq.us-east-2.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = '12345678'
app.config['MYSQL_DB'] = 'hw3_db'
app.config['MYSQL_PORT'] = 3306
CORS(app)
mysql = MySQL(app)


@app.route('/', methods=['GET', 'POST'])
def api_handler():
    if request.method == 'POST':
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        streetaddress = request.form['streetaddress']
        city = request.form['city']
        state = request.form['state']
        zip_code = request.form['zip']
        phone = request.form['phone']
        email = request.form['email']
        date_survey = request.form['date_survey']
        checkbox = request.form['checkbox']
        radio = request.form['radio']
        dropdown = request.form['dropdown']

        query = """ INSERT INTO Student 
                        (firstname, lastname, streetaddress, city, state, zip, phone, email, date_survey, checkbox, radio, dropdown) 
                    VALUES 
                        ("{}", "{}", "{}", "{}", "{}", {}, {}, "{}","{}","{}", {}, {});"""
        try:
            cur = mysql.connection.cursor()
            cur.execute(query.format(firstname, lastname, streetaddress, city, state, zip_code, phone, email, date_survey, checkbox, radio, dropdown))
            mysql.connection.commit()
        except:
            return make_response(jsonify("Bad Request"), 400)
        return jsonify("Insert successful.")
    elif request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute('''SELECT * FROM Student;''')
            rv = cur.fetchall()
        except:
            return make_response(jsonify("Bad Request"), 400)
        return jsonify(rv)
    else:
        return make_response(jsonify("Bad Request"), 400)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=True)
