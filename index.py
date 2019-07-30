if __name__ == '__main__':
    # from controller.download_qq_music import Main
    
    # Main().start()

    from controller.qq_music_list_httpserver import Main

    import threading

    threading.Thread(
        target = Main().start,
        args = (),
        daemon = True
    ).start()

    while(True):
        q=input("\n\n系统启动(输入 q 退出)==>\n\n")
        if(q=="q"):
            print("exit")
            exit()