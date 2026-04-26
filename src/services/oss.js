const USE_MOCK = false;

export async function getOSSToken(filename, fileType) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 200));
    return {
      host: 'https://mock-bucket.oss-cn-hangzhou.aliyuncs.com',
      key: `cc-games/mock/${Date.now()}_${filename}`,
      policy: 'mock-policy',
      OSSAccessKeyId: 'mock-key-id',
      signature: 'mock-sig',
      _isMock: true,
    };
  }
  const token = localStorage.getItem('token') || '';
  const res = await fetch('/api/oss/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ filename, type: fileType }),
  });
  if (!res.ok) throw new Error('获取上传凭证失败');
  return res.json();
}

export function uploadToOSS(file, token, onProgress) {
  if (token._isMock) {
    return new Promise(resolve => {
      let p = 0;
      const timer = setInterval(() => {
        p = Math.min(p + 25, 100);
        onProgress?.(p);
        if (p >= 100) { clearInterval(timer); resolve(`${token.host}/${token.key}`); }
      }, 150);
    });
  }

  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('key', token.key);
    form.append('policy', token.policy);
    form.append('OSSAccessKeyId', token.OSSAccessKeyId);
    form.append('signature', token.signature);
    form.append('success_action_status', '200');
    if (token.callback) form.append('callback', token.callback);
    form.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', token.host);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress?.(Math.round(e.loaded / e.total * 100));
    };
    xhr.onload = () => {
      (xhr.status === 200 || xhr.status === 204)
        ? resolve(`${token.host}/${token.key}`)
        : reject(new Error(`OSS上传失败: ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error('网络错误'));
    xhr.send(form);
  });
}