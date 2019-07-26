class Song():

    author: str
    lrc: str
    title: str
    music_base: str
    url: str

    def __repr__(self):
        return f"{self.title}-{self.author}"
