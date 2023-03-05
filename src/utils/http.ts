import Taro from '@tarojs/taro'

interface UploadAudioOptions {
    filePath: string,
    data: Record<string, string>
}


export const uploadAudio = (options: UploadAudioOptions) => {
    return new Promise((resolve, reject) => {
        Taro.uploadFile({
            url: '',
            filePath: options.filePath,
            name: 'file',
            header: {
                "Content-type": "multiply/form-data"
            },
            formData: options.data,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}
