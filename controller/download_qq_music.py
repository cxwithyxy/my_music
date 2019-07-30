import json
from ttjt.Ttjt import Ttjt
from file_io.parser.qq_music import Parser as QQParser
from ttjt.song import Song
from multiprocessing.pool import ThreadPool as Pool
from downloader.Downloader import Downloader
import pathlib
from file_io.Json_controller import Json_controller as JSONC
import time
import random
import threading

class Main():

    qq_parser: QQParser
    songs_json: JSONC
    parse_qq_music_list_json: JSONC
    a = 1
    lock: threading.Lock

    def start(self):
        self.parse_qq_music_list_json = JSONC("parse_qq_music_list.json")
        if(not self.parse_qq_music_list_json.file_is_exists()):
            self.qq_parser = QQParser("qq_music_list.json")
            parse_qq_music = self.qq_parser.get_parse_qq_music_list()
            self.parse_qq_music_list_json.set_data(parse_qq_music)
            self.parse_qq_music_list_json.save()
        
        self.songs_json = JSONC("songs.json")
        self.songs_json.auto_save_start(3)
        self.qq_music_list_to_song_list()
       

    def qq_music_list_to_song_list(self):
        def pool_do(element):
            music_name = element["music_name"]
            music_songer = element["music_songer"]
            is_in_songs_json = False
            json_for_check = self.songs_json.get_data()
            for i in json_for_check:
                temp_song = Song().init_with_dict(i)
                if(
                    temp_song.title.find(music_name) != -1 
                    and temp_song.author.find(music_songer) != -1 
                ):
                    is_in_songs_json = True
                    break
            # if music_name == "够钟":
            #     print(is_in_songs_json)
            if not is_in_songs_json:
                # print(f"get {self.a}: {music_name}")
                
                song = self.get_song(music_name, music_songer)
                self.lock.acquire()
                self.songs_json.get_data().append(song.to_dict())
                print(f"finish {music_name} {self.a}: {song}  {len(self.songs_json.get_data())}")
                self.lock.release()
            # download_path = f"Z:\\歌\\{song.get_file_name()}"
            # if(not pathlib.Path(download_path).exists()):
            #     dl = Downloader(song.url, download_path)
            #     dl.start()
            self.a += 1
            
        
        pool = Pool(processes = 10)
        print(f"songs_json: {len(self.songs_json.get_data())}")
        print(f"parse_qq_music_list_json: {len(self.parse_qq_music_list_json.get_data())}")
        self.lock = threading.Lock()
        def pool_start ():
            prs = pool.map(
                pool_do,
                self.parse_qq_music_list_json.get_data()
            )
        
        threading.Thread(
            target = pool_start,
            args = (),
            daemon = True
        ).start()

        while(True):
            q=input("==>")
            if(q=="q"):
                print("exit")
                exit()
            if(q=="w"):
                self.songs_json.json_data.append({"a":1})
                print(self.songs_json.get_data())
            if(q=="qq"):
                self.songs_json.auto_save_stop()

    def get_song(self, music_name:str , music_songer: str):
        ttjt = Ttjt()
        ttjt.set_music_base("qq")
        ttjt.search_music(f"{music_name}{music_songer}")
        song = ttjt.get_music_by_singer_name(music_name, music_songer)
        return song