if __name__ == '__main__':
    from controller.download_qq_music import Main
    from multiprocessing import freeze_support
    
    freeze_support()

    Main().start()

