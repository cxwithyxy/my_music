if __name__ == '__main__':
    import threading
    from controller.download_qq_music import Main as  Main_download_qq_music
    from controller.qq_music_list_httpserver import Main as Main_qq_music_list_httpserver
    
    mainrun_dict = {
        "1": {
            "main": Main_qq_music_list_httpserver,
            "descr": "启动 qq_music_list 接收服务器"
        },
        "2": {
            "main": Main_download_qq_music,
            "descr": "开始同步 songs.json 并下载 music"
        }
    }

    def mainrun(key: str):
        func = None
        try:
            func = mainrun_dict[key]["main"]().start
        except KeyError as e:
            print(f"Error: we do not have this command({key})")
            show_menu()
        if func:
            threading.Thread(
                target = func,
                args = (),
                daemon = True
            ).start()

    def show_menu():
        print("\n===== menu =====\n")
        for i in mainrun_dict:
            print(f"{i}: {mainrun_dict[i]['descr']}")


    print("\n\n系统启动(输入 q 退出)\n\n")
    show_menu()

    while(True):
        q=input("\n==>\n")
        if(q=="q"):
            print("exit")
            exit()
        mainrun(q)
        