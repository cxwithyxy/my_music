from ttjt.Ttjt import Ttjt

ttjt = Ttjt()

ttjt.set_music_base("qq")
ttjt.search_music("差半步")
song = ttjt.get_music_by_singer_name("卫兰")
print(song)