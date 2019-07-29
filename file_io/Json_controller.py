import json
from threading import Thread
import time
import pathlib
import threading

class Json_controller:
    
    path:str
    json_data = None
    auto_save_thread:Thread = None

    def file_is_exists(self):
        return pathlib.Path(self.path).exists()

    def __init__(self, path: str):
        self.path = path
        if(not self.file_is_exists()):
            self.set_data([])

    def get_data(self):
        if(not self.json_data == None):
            return self.json_data
        self.json_data = json.load(open(self.path, encoding="utf8"))
        return self.json_data
    
    def set_data(self, content):
        self.json_data = content

    def save(self):
        print(f"save data: {len(self.json_data)}")
        json.dump(self.json_data, open(self.path, "w", encoding="utf8"))

    def thread_do(self, loop_time: int):
        while True and self.auto_save_thread:
            time.sleep(loop_time)
            lock = threading.Lock()
            lock.acquire()
            self.save()
            lock.release()

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
        self.auto_save_thread = None