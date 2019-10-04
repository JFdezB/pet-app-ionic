import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class APIService {
  private API_URL = 'https://petstore.swagger.io/v2';
  constructor(private httpClient: HttpClient) {
  }

  async postPet(pet: object) {
    return this.httpClient.post(
      `${this.API_URL}/pet`,
      pet)
      .toPromise()
  }

  async getPets(status:string) {
    return this.httpClient.get(
      `${this.API_URL}/pet/findByStatus?status=${status}`)
      .toPromise()
  }

  async getPet(id: string) {
    return this.httpClient.get(
      `${this.API_URL}/pet/${id}`)
      .toPromise()
  }

  async deletePet(petId: string) {
    return this.httpClient.delete(
      `${this.API_URL}/pet/${petId}`)
      .toPromise()
  }
}
