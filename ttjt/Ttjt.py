import requests
import json
from ttjt.song import Song
class Ttjt():

    search_music_url = "http://47.112.23.238/Music/res"
    music_base: str
    music_search_resv_data: dict

    def __init__(self):
        pass
    
    def set_music_base(self, music_base: str):
        self.music_base = music_base

    def search_music(self, music_name: str) -> dict:
        a = requests.post(
            self.search_music_url,
            {
                "musicName": music_name,
                "type": self.music_base
            }
        )
        self. music_search_resv_data = a.json()['data']
        return self. music_search_resv_data
    
    def get_music_by_singer_name(self, name_of_singer: str) -> Song:
        for i in self.music_search_resv_data:
            if(str(i["author"]).find(name_of_singer) != -1):
                return_song = Song()
                return_song.author = i["author"]
                return_song.lrc = i["lrc"]
                return_song.title = i["title"]
                return_song.music_base = i["type"]
                return_song.url = i["url"]
                return return_song
        return False
