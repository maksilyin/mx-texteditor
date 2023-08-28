class EndpointsRegister {
    static baseUrl = "";
    static uploadImage = "http://v1755698.hosted-by-vdsina.ru/upload.php";
    static uploadImageByPath = "http://v1755698.hosted-by-vdsina.ru/upload.php";

    static setEndpoints = (data) => {
        for (let key in data) {
            if (EndpointsRegister[key]) {
                EndpointsRegister[key] = data[key];
            }
        }
    }

    static getUrl = (endpoint) => {
        return `${EndpointsRegister.baseUrl}${EndpointsRegister[endpoint]}`;
    }
}

export default EndpointsRegister
