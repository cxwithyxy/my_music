class Song():

    author: str
    lrc: str
    title: str
    music_base: str
    url: str

    def __repr__(self):
        return f"{self.title}-{self.author}"

    def get_file_name(self) -> str:
        return f"{str(self)}.mp3"

    def to_dict(self) -> dict:
        return {
            "author": self.author,
            "lrc": self.lrc,
            "title": self.title,
            "music_base": self.music_base,
            "url": self.url
        }