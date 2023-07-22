import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conducteur} from "../EnititeComponent/Models/Conducteur";

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  backendHost :String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public searchConducteur(keyword : String):Observable<Array<Conducteur>>{
    return this.http.get<Array<Conducteur>>(this.backendHost+"/conducteurs/search?keyword="+keyword)
  }
}
