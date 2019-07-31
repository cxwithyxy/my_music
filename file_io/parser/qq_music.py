from file_io.Json_controller import Json_controller as JSONC
import pathlib

class not_found(BaseException):
    pass

class Parser:
    """Parser 歌单json解析器
    
    Argus:
        json_path: 从qq音乐中找到的"我喜欢"歌曲JSON
    """
    
    qq_music_list: list
    iter_qq_music_list: iter

    def __init__(self, json_path: str):
        if not pathlib.Path(json_path).exists():
            raise not_found(f"找不到文件({json_path})，确定已经获取 qq_music_list 了吗？")
        self.qq_music_list = JSONC(json_path).get_data()
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

    def get_parse_qq_music_list(self) -> list:
        return_list = []
        while True:
            try:
                music_name,music_songer = self.next_music()
                can_add = True
                for i in return_list:
                    if(
                        music_name == i["music_name"] and
                        music_songer == i["music_songer"]
                    ):
                        can_add = False
                        break
                if can_add:
                    return_list.append({
                        "music_name": music_name,
                        "music_songer": music_songer
                    })
            except:
                break
        return return_list