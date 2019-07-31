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
from file_io.Config_controller import Config_controller as ConfC

class Main():

    qq_parser: QQParser
    songs_json: JSONC
    parse_qq_music_list_json: JSONC
    confc: ConfC

    def __init__(self):
        self.confc = confc = ConfC("setting.ini")
        self.confc.cd("path_set")

    def start(self):
        self.parse_qq_music_list_json = JSONC(self.confc.get("parse_qq_music_list"))
        if(not self.parse_qq_music_list_json.file_is_exists()):
            self.qq_parser = QQParser(self.confc.get("qq_music_list"))
            parse_qq_music = self.qq_parser.get_parse_qq_music_list()
            self.parse_qq_music_list_json.set_data(parse_qq_music)
            self.parse_qq_music_list_json.save()
            print("保存 parse_qq_music_list.json 成功")
            
        self.songs_json = JSONC(self.confc.get("songs"))
        self.qq_music_list_to_song_list()

        self.download_base_songs()

    def qq_music_list_to_song_list(self):
        counter = [1]
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
                a = counter[0]
                print(f"同步#{a}: <{song}> 已存{len(self.songs_json.get_data())}")
            counter[0] += 1
        
        pool = Pool(processes = 10)
        self.songs_json.auto_save_start(3)
        prs = pool.map(
            pool_do,
            self.parse_qq_music_list_json.get_data()
        )
        self.songs_json.auto_save_stop()
        print(f"songs.json ({len(self.songs_json.get_data())}) 完成")

    def download_base_songs(self):
        counter = [1]
        def pool_do(song_dict: dict):
            a = counter[0]
            counter[0] += 1
            song = Song().init_with_dict(song_dict)
            download_dir = self.confc.get("download_dir")
            download_path = f"{download_dir}{song.get_file_name()}"
            if(not pathlib.Path(download_path).exists()):
                dl = Downloader(song.url, download_path)
                print(f"下载#{a}: {download_path}")
                dl.start()
                print(f"完成#{a}: {download_path}")
        pool = Pool(processes = 4)
        pool.map(
            pool_do,
            self.songs_json.get_data()
        )
        print("download finish")

    def get_song(self, music_name:str , music_songer: str):
        ttjt = Ttjt()
        ttjt.set_music_base("qq")
        ttjt.search_music(f"{music_name}{music_songer}")
        song = ttjt.get_music_by_singer_name(music_name, music_songer)
        return song