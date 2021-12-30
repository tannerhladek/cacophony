from flask_socketio import SocketIO, emit
import os

# # create your SocketIO instance
# if os.environ.get("FLASK_ENV") == "production":
#    origins = [
#       "http://actual-app-url.herokuapp.com",
#       "https://actual-app-url.herokuapp.com"
#    ]
# else:
origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
# @socketio.on("add_message")
def handle_add_message(data):
   print('IN THE SOCKET!! =========', data)
   socketio.emit("add_message", data, broadcast=True)
