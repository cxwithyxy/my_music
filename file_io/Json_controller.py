import json
from multiprocessing import Process
from multiprocessing.managers import BaseManager
import time
import pathlib

class Json_controller:
    
    path:str
    data = None
    auto_save_thread:Process = None

    def file_is_exists(self):
        return pathlib.Path(self.path).exists()

    def __init__(self, path: str):
        self.path = path

    def get_data(self):
        if(self.data):
            return self.data
        self.data = json.load(open(self.path, encoding="utf8"))
        return self.data
    
    def set_data(self, content):
        self.data = content

    def save(self):
        json.dump(self.data, open(self.path, "w", encoding="utf8"))

    def thread_do(self, loop_time: int):
        while True:
            time.sleep(loop_time)
            self.save()

    def auto_save_start(self, loop_time: int):
        if(self.auto_save_thread):
            return
        self.auto_save_thread = Process(
            name = f"json_auto_save: {self.path}",
            target = self.thread_do,
            args=(loop_time,)
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