import sys
import yt_dlp

def fetch_video_formats(video_url):
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            formats = info.get('formats', [])
            for fmt in formats:
                print(f"ID: {fmt['format_id']}, EXT: {fmt['ext']}, RES: {fmt['resolution']}")
    except yt_dlp.utils.DownloadError as e:
        print(f"Error fetching formats: {str(e)}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please provide a video URL")
    else:
        video_url = sys.argv[1]
        fetch_video_formats(video_url)
