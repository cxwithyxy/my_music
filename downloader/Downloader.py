import wget

class Downloader():

    url: str
    output: str

    def __init__(self, url: str, output: str):
        self.url = url
        self.output = output

    def start(self):
        wget.download(self.url, self.output, None)