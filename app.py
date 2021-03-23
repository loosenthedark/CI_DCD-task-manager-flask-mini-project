import os
from flask import (
    Flask, flash, render_template, 
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists('env.py'):
    import env


app = Flask(__name__)

app.config['MONGO_DBNAME'] = os.environ.get('MONGO_DBNAME')
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
app.secret_key = os.environ.get('SECRET_KEY')

mongo = PyMongo(app)


@app.route('/')
@app.route('/get_tasks')
def get_tasks():
    tasks = mongo.db.tasks.find()
    return render_template('tasks.html', tasks=tasks)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Check to see if username already exists in DB
        existing_user = mongo.db.users.find_one(
            {'username': request.form.get('username').lower()})

        if existing_user:
            flash(
                'That username already exists - please enter a different one!')
            return redirect(url_for('register'))

        register = {
            "username": request.form.get('username').lower(),
            "password": generate_password_hash(request.form.get('password'))
        }
        mongo.db.users.insert_one(register)

        # Store new registered user in session cookie
        session['user'] = request.form.get('username').lower()

        flash('Registration successful!')

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Check to see if username already exists in DB
        existing_user = mongo.db.users.find_one(
            {'username': request.form.get('username').lower()})

        if existing_user:
            # Check to see if hashed password in DB matches user input
            if check_password_hash(
                existing_user["password"], request.form.get('password')):
                # Store new registered user in session cookie
                session['user'] = request.form.get('username').lower()
                # Display welcome message to user upon successful login
                flash('Welcome, {}!'.format(request.form.get('username')))
            else:
                # If passwords described above don't match
                flash('Incorrect Username and/or Password. Please try again!')
                return redirect(url_for('login'))

        else:
            # If username isn't recognised by DB
            flash('Incorrect Username and/or Password. Please try again!')
            return redirect(url_for('login'))

    return render_template('login.html')


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
