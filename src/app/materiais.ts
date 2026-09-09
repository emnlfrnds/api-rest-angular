import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IMaterial } from './IMaterial';
import { API_PATH } from './app.config';

@Injectable({
    providedIn: 'root'
})

export class Materiais {
    constructor(private httpClient: HttpClient) 
    {}

    obterTodos() : Observable<IMaterial[]>
    {
        return this.httpClient.get<IMaterial[]>(`${API_PATH}materiais`)
    }

    obterPorId(id: number) : Observable<IMaterial> {
        return this.httpClient.get<IMaterial>(`${API_PATH}materiais/${id}`)
    }
}
