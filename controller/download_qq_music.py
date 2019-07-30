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
        
        def main_start ():
            self.parse_qq_music_list_json = JSONC("parse_qq_music_list.json")
            if(not self.parse_qq_music_list_json.file_is_exists()):
                self.qq_parser = QQParser("qq_music_list.json")
                parse_qq_music = self.qq_parser.get_parse_qq_music_list()
                self.parse_qq_music_list_json.set_data(parse_qq_music)
                self.parse_qq_music_list_json.save()
                print("保存 parse_qq_music_list.json 成功")
             
            self.songs_json = JSONC("songs.json")
            self.qq_music_list_to_song_list()
        
        threading.Thread(
            target = main_start,
            args = (),
            daemon = True
        ).start()

        while(True):
            q=input("\n\n系统启动(输入q退出)==>\n\n")
            if(q=="q"):
                print("exit")
                exit()
            if(q=="qq"):
                self.songs_json.auto_save_stop()

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
            if not is_in_songs_json:
                song = self.get_song(music_name, music_songer)
                self.songs_json.get_data().append(song.to_dict())
                print(f"同步#{self.a}: <{song}> 已存{len(self.songs_json.get_data())}")
            # download_path = f"Z:\\歌\\{song.get_file_name()}"
            # if(not pathlib.Path(download_path).exists()):
            #     dl = Downloader(song.url, download_path)
            #     dl.start()
            self.a += 1
        
        pool = Pool(processes = 10)
        print(f"songs_json: {len(self.songs_json.get_data())}")
        print(f"parse_qq_music_list_json: {len(self.parse_qq_music_list_json.get_data())}")
        self.songs_json.auto_save_start(3)
        prs = pool.map(
            pool_do,
            self.parse_qq_music_list_json.get_data()
        )
        self.songs_json.auto_save_stop()
        print("songs.json 完成")
        

    def get_song(self, music_name:str , music_songer: str):
        ttjt = Ttjt()
        ttjt.set_music_base("qq")
        ttjt.search_music(f"{music_name}{music_songer}")
        song = ttjt.get_music_by_singer_name(music_name, music_songer)
        return song