
from ttjt.Ttjt import Ttjt
from myparser.qq_music import Parser as QQParser
from ttjt.song import Song

class Main():

    qq_parser: QQParser
    song_list = []

    def start(self):
        self.qq_parser = QQParser("qq_music_list.json")
        self.qq_music_list_to_song_list()

    def qq_music_list_to_song_list(self):
        a = 1
        while True:
            try:
                music_name, music_songer = self.qq_parser.next_music()
            except:
                break
            song = self.get_song(music_name, music_songer)
            self.song_list.append(song)
            print(f"{a}: {song}")
            a += 1

    def get_song(self, music_name:str , music_songer: str):
        ttjt = Ttjt()
        ttjt.set_music_base("qq")
        ttjt.search_music(music_name)
        song = ttjt.get_music_by_singer_name(music_songer)
        return song