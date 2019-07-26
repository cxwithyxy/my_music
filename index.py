# from ttjt.Ttjt import Ttjt

# from downloader.Downloader import Downloader

# ttjt = Ttjt()

# ttjt.set_music_base("qq")
# ttjt.search_music("差半步")
# song = ttjt.get_music_by_singer_name("卫兰")
# print((song))
# dl = Downloader(song.url, song.get_file_name())
# dl.start()

from controller.download_qq_music import Main

Main().start()