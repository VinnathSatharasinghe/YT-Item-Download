import sys
import yt_dlp

def download_video(video_url, format_id):
    ydl_opts = {
        'format': format_id,  # Download the video in the specified format
        'quiet': True,
        'outtmpl': '%(title)s.%(ext)s'  # Save the file as the video title
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
        print(f"Download completed for URL: {video_url}")
    except yt_dlp.utils.DownloadError as e:
        print(f"Error downloading video: {str(e)}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Please provide a video URL and format ID")
    else:
        video_url = sys.argv[1]
        format_id = sys.argv[2]
        download_video(video_url, format_id)
