import OSS from 'ali-oss';

const OSS_CONFIG = {
  bucket: 'obsidian-img-loong',
  region: 'oss-cn-chengdu',
  uploadDir: 'cc-games/',
};

let credentialsCache = null;

export async function getSTSCredentials() {
  if (credentialsCache && new Date(credentialsCache.expiration) > new Date()) {
    return credentialsCache;
  }
  const token = localStorage.getItem('token') || '';
  const res = await fetch('/api/media/sts-credentials', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('获取STS凭证失败');
  const { data } = await res.json();
  credentialsCache = data;
  return data;
}

export async function uploadToOSS(file, onProgress) {
  const sts = await getSTSCredentials();

  const client = new OSS({
    region: OSS_CONFIG.region,
    accessKeyId: sts.accessKeyId,
    accessKeySecret: sts.accessKeySecret,
    stsToken: sts.securityToken,
    bucket: OSS_CONFIG.bucket,
    refreshSTSToken: async () => {
      const newSts = await getSTSCredentials();
      return {
        accessKeyId: newSts.accessKeyId,
        accessKeySecret: newSts.accessKeySecret,
        stsToken: newSts.securityToken,
      };
    },
  });

  const key = `${OSS_CONFIG.uploadDir}${Date.now()}_${file.name}`;

  const result = await client.put(key, file, {
    progress: (p) => {
      onProgress?.(Math.round(p * 100));
    },
  });

  return result.url;
}
