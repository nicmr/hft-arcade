import tornado.ioloop as ioloop
import json
import tornado.web
import tornado.websocket
import tornado.httpserver as httpserver
from pymongo import MongoClient
from bson.objectid import ObjectId
import pprint
import base64


class MainHandler(tornado.web.RequestHandler):
    """basic http request handler"""
    def get(self):
        """returns text for http get request"""
        self.write("Hello, world")




class EchoWebSocket(tornado.websocket.WebSocketHandler):
    """a basic websocket connection handler"""


    def check_origin(self, origin):
        return True

    def open(self):
        self.write_message("socket opened echo")
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message("Received: " + message)





    def on_close(self):
        print("Websocket closed")

class LocalGameHandler(tornado.websocket.WebSocketHandler):
        def check_origin(self, origin):
            return True


        def open(self):
            self.write_message("socket openend")
            print("socket opened")

        def on_message(self, message):
            jsondict = json.loads(message)
            client = MongoClient()
            db = client['arcade']
            collection = db['user']
            update_scores = collection.update(jsondict['name'], jsondict)
            update_scores
            print('success')

class AccountHandler(tornado.websocket.WebSocketHandler):


    def check_origin(self, origin):
        return True


    def open(self):
        self.write_message("socket openend")
        print("socket opened")


    def on_message(self, message):
        print(message)
        print("hallo")
        client = MongoClient()
        db = client['arcade']
        collection = db['user']
        user = json.loads(message)
        post_user =  collection.insert_one(user).inserted_id
        try:
            post_user
        except Exception:
            print('username already taken')
            pass

        self.write_message("user created")


class LoginHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print("socket opened")

    def on_message(self, mess):
        client = MongoClient()
        db = client['arcade']
        collection = db['user']
        user = json.loads(mess)
        try:
            founduser = collection.find_one(user)
            founduser
            print(founduser)
            print("success")
            username = founduser['name']
            self.write_message(username)
        except SyntaxError:
            print("user & password combination doesnt exist!")
            pass

def make_app():
    """creates a tornado.web.Application"""




    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/ws/", EchoWebSocket)

    ])

class AppClass(tornado.web.Application):
    """returns an web.Application object containing handlers for both http and websocket requests"""
    def __init__(self):
        handlers = [
            (r'/', MainHandler),        #maps to localhost:8765/
            (r'/ws/', EchoWebSocket),   #maps to localhost:8765/ws/
            (r'/acc/ws/', AccountHandler),
            (r'/login/ws/', LoginHandler),
            (r'/local/ws/', LocalGameHandler),
        ]

        settings = {
            #'template_path': 'templates',
            #'autoreload' : 'true'   #server will restart whenever any changes are made to source
                #disabled becaused it glitched and reserved the socket port multiple times
        }
        tornado.web.Application.__init__(self, handlers, **settings)

if __name__ == "__main__":

    # APP = make_app() #using constructor instead
    APP = AppClass()
    server = httpserver.HTTPServer(APP)
    server.listen(8765)

    try:
        ioloop.IOLoop.current().start()

    except KeyboardInterrupt:
        print("Keyboard interrupt. Closing tornado.")
        current_ioloop = ioloop.IOLoop.instance()
        current_ioloop.add_callback(current_ioloop.stop)
        print("done")
