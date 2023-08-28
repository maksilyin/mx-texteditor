import EndpointsRegister from "./EndpointsRegister.js"

class http {
    uploadImage = (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const headers = {
            "Content-Type": "multipart/form-data"
        }

        return axios({
            method: "post",
            url: EndpointsRegister.getUrl('uploadImage'),
            data: formData,
            headers: headers,
        });
    }

    uploadImageByPath = async (path) => {
        const formData = new FormData();
        formData.append('path', path);

        const headers = {
            "Content-Type": "multipart/form-data"
        }

        return axios({
            method: "post",
            url: EndpointsRegister.getUrl('uploadImageByPath'),
            data: formData,
            headers: headers,
        });
    }

    sendResult = (data) => {
        return axios({
            method: "post",
            url: "/backend.php",
            data: data,
        });
    }
}

export default new http();
