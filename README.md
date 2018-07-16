# Findex, a file manager tool
#### ---- PROJECT STATUS: PRE-ALPHA ----
The installer is not working as of now, if you want to try it then you'll have to look through the PHP code.
I can give you some screenshots of the Database I'm using if needed...


This is a tool made to entertain myself when I was bored, I did not make this to be ultra well made and enterprise level quality.
I made this tool for people who want a file manager on their server and be able to access their files even if the FTP port is blocked.
With this you can download, remove files, share them and much more!

Download the latest FileIndexer version from [here](https://github.com/Y1mura/FileIndexer/archive/master.zip)
or clone this project with any git tool.

## Installation
1. Download the zip from [here](https://github.com/Y1mura/FileIndexer/archive/master.zip)
1. Extract all files
1. Upload the files with your favourite FTP client
1. Put the files into your DOC_ROOT of your webserver
1. If you've done that then you're almost done, head on over to yourdomain.example and you'll be automaticly represented with the installer

## Uploads and other problems
If you're uploading large files to your personal server then don't forget to change your allowed file size upload.
#### In `php.ini` file change these two values to something that you feel comfortable with.
```
post_max_size=2048M
upload_max_filesize=2048M
```

## Translations
Might be added later on...

## License
This project is under the GNU-3.0 License

## ! ! ! DISCLAIMER ! ! !
```
I am not responsible for lost files, folders or thermonuclear war or other things that might have happened.
I am willing to give you certain help if you need to recover files although it might not always work!
```
