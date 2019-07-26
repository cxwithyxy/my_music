import json
class Parser:
    """Parser 歌单json解析器
    
    Argus:
        json_path: 从qq音乐中找到的"我喜欢"歌曲JSON
    """
    
    qq_music_list: list
    iter_qq_music_list: iter

    def __init__(self, json_path: str):
        self.qq_music_list = json.load(open(json_path, encoding="utf8"))
        self.iter_qq_music_list = iter(self.qq_music_list)

    def next_element_in_qq_music_list(self) -> dict:
        return next(self.iter_qq_music_list)

    def next_music_by_dict(self, music_obj: dict) -> (str, str):
        music_name = music_obj["name"]
        music_songer = music_obj["singer"][0]["name"]
        return (music_name, music_songer)

    def next_music(self) -> (str, str):
        """获得下一首歌的信息
        
        return:
            music_name: 歌曲名
            music_songer: 歌手名

        """
        i = self.next_element_in_qq_music_list()
        return self.next_music_by_dict(i)