import axios from 'axios';

const configuredAxios = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`,
});

export async function httpGetJson<T>(path: string): Promise<T> {
    return configuredAxios.get(path)
      .then((res) => res.data as T)
      .catch(function (error) {
          if (error.response) {
              throw new Error('Request was not successful');
          } else {
              if (error.request) {
                  throw new Error('No response received');
              } else {
                  throw new Error('Unknown Error!');
              }
          }
      });
}

export const httpPostMultipart = async <T>(
    url: string,
    formData: FormData,
    headers?: Record<string, string>
  ): Promise<T> => {
    return configuredAxios.post(url,formData, {headers}).then((res) => res ? res.data : Promise.resolve()) as Promise<T>;
  };

  export async function httpPostJson<T>(path: string, data: any): Promise<T> {
    return configuredAxios.post(path, data)
      .then((res) => res ? res.data : Promise.resolve())
      .catch((error) => {
        throw error;
      }) as Promise<T>;
  }


  export async function httpPutJson<T>(path: string, data: any): Promise<T> {
    return configuredAxios
      .put(path, data)
      .then((res) => (res ? res.data : Promise.resolve()))
      .catch((error) => {
        throw error;
      }) as Promise<T>;
  }
  



export async function httpDeleteS3File(path: string) {
    return configuredAxios.delete(path);
}

export async function httpDeleteJson(path: string) {
    return configuredAxios.delete(path);
}