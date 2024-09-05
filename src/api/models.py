from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    contacts = db.relationship('Contact', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # No serialices la contraseña por razones de seguridad
            "contacts": [contact.serialize() for contact in self.contacts],
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(9), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Contacto {self.full_name}>'

    def serialize(self):
        return {
            "id": self.id,
        "full_name": self.full_name,
        "email": self.email,  
        "phone": self.phone,
        "address": self.address  
        
        }
