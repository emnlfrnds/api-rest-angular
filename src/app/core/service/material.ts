import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IMaterial } from '../interface/IMaterial';
import { API_PATH } from '../../app.config';

@Injectable({
    providedIn: 'root'
})

export class MaterialService {
    
    constructor(private httpClient: HttpClient) {}

    getMat() : Observable<IMaterial[]>
    {
        return this.httpClient.get<IMaterial[]>(`${API_PATH}materiais`);
    }

    getPorIdMat(id: number) : Observable<IMaterial> {
        return this.httpClient.get<IMaterial>(`${API_PATH}materiais/${id}`);
    }

    postMat(material: IMaterial) : Observable<IMaterial> {
        return this.httpClient.post<IMaterial>(`${API_PATH}materiais`, material);
    }
}
