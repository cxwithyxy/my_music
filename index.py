if __name__ == '__main__':
    import threading
    from controller.download_qq_music import Main as  Main_download_qq_music
    from controller.qq_music_list_httpserver import Main as Main_qq_music_list_httpserver
    
    mainrun_dict = {
        "1": Main_qq_music_list_httpserver,
        "2": Main_download_qq_music
    }

    def mainrun(key: str):
        func = None
        try:
            func = mainrun_dict[key]().start
        except KeyError as e:
            print(f"we do not have this command({key})")
        if func:
            threading.Thread(
                target = func,
                args = (),
                daemon = True
            ).start()

    print("\n\n系统启动(输入 q 退出)\n\n")
    while(True):
        q=input("\n==>\n")
        if(q=="q"):
            print("exit")
            exit()
        mainrun(q)