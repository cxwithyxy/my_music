import configparser
import pathlib
import shutil

class not_found(BaseException):
    pass
class file_not_exists(BaseException):
    pass

class Config_controller:

    ini_file_path: str
    conf: configparser.ConfigParser
    section: str

    def __init__(self, path: str):
        self.conf = configparser.ConfigParser()
        self.ini_file_path = path
        self.read_ini_file()

    def read_ini_file(self):
        if not pathlib.Path(self.ini_file_path).exists():
            demo_path = f"{self.ini_file_path}.demo"
            if pathlib.Path(demo_path).exists():
                shutil.copy(demo_path, self.ini_file_path)
            else:
                raise file_not_exists(f"demo file({demo_path}) not found when trying to make ini file({self.ini_file_path})")
        try:
            self.conf.read(self.ini_file_path, encoding="utf8")
        except configparser.MissingSectionHeaderError as e:
            self.conf.read(self.ini_file_path, encoding="utf_8_sig")
        except UnicodeDecodeError as e:
            self.conf.read(self.ini_file_path, encoding="gbk")

    def cd(self, section: str):
        self.section = section
        try:
            self.conf[self.section]
        except KeyError as e:
            raise not_found(f"Section({self.section}) not found")

    def get(self, key: str):
        try:
            return self.conf[self.section][key]
        except KeyError as e:
            raise not_found(f"Section({self.section})'s key({key}) not found")