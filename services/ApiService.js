import axios from 'axios';
import { API_URL } from '../const';
import { AccessKeyService } from './StorageService';

const keyServices = new AccessKeyService();

export class ApiService {
  #apiUrl = API_URL;
  accessKey = keyServices.get();

  async getAccessKey() {
    try {
      if (!this.accessKey) {
        const response = await axios.get(`${this.#apiUrl}/api/users/accessKey`);
        this.accessKey = keyServices.set(response.data.accessKey);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async getData(pathname, params = {}) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }
    try {
      const response = await axios.get(`${this.#apiUrl}/${pathname}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`,
        },
        params,
      });

      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        this.accessKey = keyServices.delete();

        return this.getData(pathname, params);
      } else {
        console.error(err.message);
      }
    }
  }

  async getProducts(params = {}) {
    if (params.list) {
      params.list = params.list.join();
    }
    return await this.getData('api/products', params);
  }

  async getProductCategories() {
    return await this.getData('api/productCategories');
  }

  async getProductById(id) {
    return await this.getData(`api/products/${id}`);
  }
}
