from http.server import HTTPServer, BaseHTTPRequestHandler
import threading
import json
from file_io.Config_controller import Config_controller as ConfC
from file_io.Json_controller import Json_controller as JSONC
import pyperclip
from file_tools.file import get_file_string

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        song_list = json.loads(body)
        
        print(f"receive song_list({len(song_list)})")
        
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
        self.code_to_clipboard()
        httpd = SimpleHTTPServer(('localhost', 8182), SimpleHTTPRequestHandler)
        print("\n\nqq_music_list receive server start \n\n")
        print("打开 https://y.qq.com/portal/profile.html 并登陆")
        print("按下 f12 打开调试台, 在代码区域 ctrl+v 粘贴代码, 按下回车运行")
        httpd.serve_forever()
        print(f"\nserver shutdown !")
        qq_music_list_path = self.confc.get("qq_music_list")
        jsonc = JSONC(qq_music_list_path)
        jsonc.set_data(httpd.song_list)
        jsonc.save()
        print(f"\nsave ({len(jsonc.get_data())}) in {qq_music_list_path} successfully !")
    
    def code_to_clipboard(self):
        a = get_file_string("browser_script/get_qq_music_list.js", encoding="utf8")
        pyperclip.copy(a)

