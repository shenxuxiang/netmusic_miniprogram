function request(url, method, query) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data: query,
      success: (response) => {
        if (response.statusCode === 200) {
          return resolve(response.data);
        } else {console.log(response)
          const error = new Error(response);
          return reject(error);
        }
      },
      fail: (error) => {
        const { errMsg } = error;
        wx.showToast({ title: errMsg, icon: 'none' });
        return reject(error);
      },
    });
  });
}

module.exports = request;
