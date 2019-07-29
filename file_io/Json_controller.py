import json
class Json_controller:
    
    path:str
    data = None

    def __init__(self, path: str):
        self.path = path

    def get_data(self):
        if(self.data):
            return self.data
        self.data = json.load(open(self.path, encoding="utf8"))
        return self.data
    