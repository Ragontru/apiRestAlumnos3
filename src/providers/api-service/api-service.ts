import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from 'src/app/modelo/Alumno';

@Injectable()
export class ApiServiceProvider {

    private URL = "http://localhost:3000";

    constructor(public http: HttpClient) {
    }

    getAlumnos(): Promise<Alumno[]> {
        let promise = new Promise<Alumno[]>((resolve, reject) => {
            this.http.get(this.URL + "/alumnos").toPromise()
                .then((data: any) => {
                    let alumnos = new Array<Alumno>();
                    data.forEach(alumnoJson => {
                        let alumno = Alumno.createFromJsonObject(alumnoJson);
                        alumnos.push(alumno);
                    });
                    resolve(alumnos);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }

    eliminarAlumno(id: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL + "/alumnos/" + id).toPromise().then(
                (data: any) => { // Success
                    console.log(data)
                    resolve(true);
                }
            )
                .catch((error: Error) => {
                    console.log(error.message);
                    reject(error.message);
                });
        });
        return promise;
    }

    modificarAlumno(idAlumno: number, nuevosDatosAlumno: Alumno): Promise<Alumno> {
        let promise = new Promise<Alumno>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = nuevosDatosAlumno.getJsonObject();
            this.http.put(this.URL + "/alumnos/" + idAlumno,
                JSON.stringify(datos),
                header).toPromise().then(
                    (data: any) => { // Success
                        let alumno: Alumno;
                        alumno = Alumno.createFromJsonObject(data);
                        resolve(alumno);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;

    }

}