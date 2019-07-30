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
        # print(f"start {music_name}")
        while(True):
            try:
                a = requests.post(
                    self.search_music_url,
                    {
                        "musicName": music_name,
                        "type": self.music_base
                    },
                    timeout = 5
                )
                break
            except BaseException as e:
                print(f"超时, 继续: {music_name}")
                pass
        # print(f"end {music_name}")
        self. music_search_resv_data = a.json()['data']
        # print(f"search_music: {music_name}")
        return self. music_search_resv_data
    
    def get_music_by_singer_name(self, music_name:str, name_of_singer: str) -> Song:
        for i in self.music_search_resv_data:
            # print(f'{str(i["author"])} -- {name_of_singer}')
            if(
                str(i["author"]).find(name_of_singer) != -1 and
                str(i["title"]).find(music_name) != -1
            ):
                return_song = Song()
                return_song.author = i["author"]
                return_song.lrc = i["lrc"]
                return_song.title = i["title"]
                return_song.music_base = i["type"]
                return_song.url = i["url"]
                return return_song
        # print(f"name_of_singer: {name_of_singer}")
        raise BaseException("we can find that singer's song")
