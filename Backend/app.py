from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Users

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rpserverbox:9995640988@localhost/user_data'
db.init_app(app)

@app.route('/', methods=['GET'])
def main():
    return "Hello world!"
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = Users(name=data['name'], email=data['email'], city=data['city'], mobile=data['mobile'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully.'})

@app.route('/users', methods=['GET'])
def get_users():
    limit = request.args.get('limit', default=None, type=int)
    print(limit)
    if limit is None:
        users = Users.query.all()
    else:
        users = Users.query.limit(limit).all()
    result = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['name'] = user.name
        user_data['email'] = user.email
        user_data['city'] = user.city
        user_data['mobile'] = user.mobile
        result.append(user_data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)