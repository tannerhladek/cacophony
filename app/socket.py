from flask_socketio import SocketIO
import os

# create your SocketIO instance
if os.environ.get("FLASK_ENV") == "production":
   origins = [
      "http://actual-app-url.herokuapp.com",
      "https://actual-app-url.herokuapp.com"
   ]
else:
   origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle new messages
def handle_add_message(data):
   socketio.emit("add_message", data, broadcast=True)


# handle deleting messages
def handle_delete_message(data):
   socketio.emit("delete_message", data, broadcast=True)
