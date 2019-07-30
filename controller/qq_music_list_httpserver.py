from http.server import HTTPServer, BaseHTTPRequestHandler
import threading
import json
from file_io.Config_controller import Config_controller as ConfC
from file_io.Json_controller import Json_controller as JSONC

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        song_list = json.loads(body)
        
        print(f"receive song_list({len(song_list)}), shutdown server now !")
        
        self.server.song_list = song_list
        self.send_response(200)
        self.end_headers()
        threading.Thread(
            target = self.server.shutdown,
            args = ()
        ).start()

    def log_message(self, *argus):
        pass

class SimpleHTTPServer(HTTPServer):
    song_list = []
    pass

class Main():

    confc: ConfC
    
    def __init__(self):
        self.confc = confc = ConfC("setting.ini")
        self.confc.cd("path_set")

    def start(self):
        httpd = SimpleHTTPServer(('localhost', 8182), SimpleHTTPRequestHandler)
        print("\n\n server start \n\n")
        httpd.serve_forever()
        print(len(httpd.song_list))
        qq_music_list_path = self.confc.get("qq_music_list")
        jsonc = JSONC(qq_music_list_path)
        jsonc.set_data(httpd.song_list)
        jsonc.save()
        print(f"save ({len(jsonc.get_data())}) success {qq_music_list_path}")

