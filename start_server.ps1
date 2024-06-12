# start_server.ps1
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:9000/")
$listener.Start()
Write-Output "Listening on http://localhost:9000/"

while ($true) {
    $context = $listener.GetContext()
    $response = $context.Response
    $request = $context.Request

    if ($request.Url.AbsolutePath -eq "/take-photo") {
        # 執行拍照指令
        ssh pi@raspberrypi.local "python /home/pi/black.py"

        # 傳輸圖片
        $localPath = "C:/Users/adaml/Desktop/binary_image.jpg"
        scp pi@raspberrypi.local:/home/pi/binary_image.jpg $localPath

        # 返回圖片
        $image = [System.IO.File]::ReadAllBytes($localPath)
        $response.ContentType = "image/jpeg"
        $response.OutputStream.Write($image, 0, $image.Length)
    } else {
        $response.StatusCode = 404
        $response.StatusDescription = "Not Found"
    }
    $response.Close()
}
