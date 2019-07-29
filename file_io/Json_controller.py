import json
from threading import Thread
import time
import pathlib

class Json_controller:
    
    path:str
    json_data = None
    auto_save_thread:Thread = None

    def file_is_exists(self):
        return pathlib.Path(self.path).exists()

    def __init__(self, path: str):
        self.path = path

    def get_data(self):
        if(self.json_data):
            return self.json_data
        self.json_data = json.load(open(self.path, encoding="utf8"))
        return self.json_data
    
    def set_data(self, content):
        self.json_data = content

    def save(self):
        json.dump(self.json_data, open(self.path, "w", encoding="utf8"))

    def thread_do(self, loop_time: int):
        while True:
            time.sleep(loop_time)
            self.save()
            print(f"save: {(self.json_data)}")

    def auto_save_start(self, loop_time: int):
        if(self.auto_save_thread):
            return
        self.auto_save_thread = Thread(
            target = self.thread_do,
            args=(loop_time,),
            daemon=True
        )
        self.auto_save_thread.start()

    def auto_save_stop(self):
        if(not self.auto_save_thread):
            return
        try:
            self.auto_save_thread.terminate()
            self.auto_save_thread = None
        except:
            self.auto_save_thread = None
            exit()