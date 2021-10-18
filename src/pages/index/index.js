Page({
    onLoad(query) {
        console.log("App load");
    },
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onMessage(e) {
        const webview = my.createWebViewContext("mainGame");
        switch (e.detail.type) {
            case "getStorageInfo":
                my.getStorageInfo({
                    success: function (res) {
                        webview.postMessage({
                            data: res,
                            id: e.detail.id,
                        });
                    },
                    fail: function (res) {
                        webview.postMessage(res.errorMessage);
                    },
                });
                break;
            case "clearStorage":
                my.clearStorage({
                    success: function () {
                        webview.postMessage("Xoá dữ liệu thành công");
                    },
                    fail: function (res) {
                        webview.postMessage(res.errorMessage);
                    },
                });
                break;
            case "setStorage":
                console.log(e.detail.data);
                my.setStorage({
                    key: e.detail.key,
                    data: e.detail.data,
                    success: function () {
                        webview.postMessage({
                            key: "_setStorage",
                            data: "Lưu dữ liệu thành công",
                        });
                    },
                });
                break;
            case "removeStorage":
                my.removeStorage({
                    key: e.detail.key,
                    success: function () {
                        webview.postMessage({
                            key: "_removeStorage",
                            data: "Xóa dữ liệu thành công",
                        });
                    },
                    fail: function (res) {
                        webview.postMessage({
                            key: "_removeStorage",
                            data: res.errorMessage,
                        });
                    },
                });
                break;
            case "getStorage":
                my.getStorage({
                    key: e.detail.key,
                    success: function (res) {
                        webview.postMessage(res);
                    },
                    fail: function (res) {
                        webview.postMessage({
                            key: "_getStorage",
                            data: res.errorMessage,
                        });
                    },
                });
                break;
            default:
                webview.postMessage(
                    "Api không tồn tại hoặc đã có lỗi xảy ra. Kiểm tra lại !"
                );
                break;
        }
    },
});
