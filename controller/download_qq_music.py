import json
from ttjt.Ttjt import Ttjt
from myparser.qq_music import Parser as QQParser
from ttjt.song import Song
from multiprocessing.pool import ThreadPool as Pool

class Main():

    qq_parser: QQParser
    song_list = []
    a = 1

    def start(self):
        self.qq_parser = QQParser("qq_music_list2.json")
        self.qq_music_list_to_song_list()

    def qq_music_list_to_song_list(self):
        def pool_do(element):
            music_name, music_songer =self.qq_parser.next_music_by_dict(element)
            song = self.get_song(music_name, music_songer)
            self.song_list.append(song)
            print(f"{self.a}: {song} {song.url}")
            self.a += 1
            return song.to_dict()
        pool = Pool(processes = 10)
        prs = pool.map(pool_do, self.qq_parser.iter_qq_music_list)
        pool.close()
        json.dump(prs, open("songs.json", "w", encoding="utf8"))

    def get_song(self, music_name:str , music_songer: str):
        ttjt = Ttjt()
        ttjt.set_music_base("qq")
        ttjt.search_music(music_name)
        song = ttjt.get_music_by_singer_name(music_songer)
        return song