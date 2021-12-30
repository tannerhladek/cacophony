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

# handle new channels
def handle_add_channel(data):
   socketio.emit("add_channel", data, broadcast=True)

# handle delete channels
def handle_delete_channel(data):
   socketio.emit("delete_channel", data, broadcast=True)

# handle edit channels
def handle_edit_channel(data):
   socketio.emit("edit_channel", data, broadcast=True)

# handle new messages
def handle_add_message(data):
   socketio.emit("add_message", data, broadcast=True)

# handle deleting messages
def handle_delete_message(data):
   socketio.emit("delete_message", data, broadcast=True)

# handle editing messages
def handle_edit_message(data):
   socketio.emit("edit_message", data, broadcast=True)
